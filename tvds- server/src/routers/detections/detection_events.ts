import { z } from "zod";
import { authedProcedure, publicProcedure } from "../../trpc";
import {
  Prisma,
  PrismaClient,
  VehicleType,
  ViolationType,
} from "@prisma/client";
import { Context } from "../../context";
import { NotFoundError } from "../../errors";
import { observable } from "@trpc/server/observable";
import { detectionNotification } from "../../events";

export enum DetectionUpdateType {
  DETECTION = "DETECTION",
}

const violationType = z.object({
  type: z.nativeEnum(ViolationType),
  at: z.number(),
});

const detectionGroupSchema = z.object({
  sourceId: z.number(),
  detectionId: z.bigint(),
  plateImage: z.string(),
  startAt: z.number(),
  endAt: z.number(),
  vehicleNumber: z.string(),
  vehicleType: z.nativeEnum(VehicleType),
  violations: violationType.array(),
});

const multipleDetectionsSchema = z.array(detectionGroupSchema);

export type MultipleDetectionsType = z.infer<typeof multipleDetectionsSchema>;

const detectionSchema = z.object({
  type: z.literal("detection"),
  data: multipleDetectionsSchema,
});

const eventSchema = z.object({
  type: z.literal("event"),
  data: z.object({
    id: z.number(),
    isActivated: z.boolean(),
  }),
});

const detectionUpdatesSchema = z.discriminatedUnion("type", [
  detectionSchema,
  eventSchema,
]);

// get vehicles from detections along with their tag information
const getVehiclesWithTags = async (
  prisma: PrismaClient,
  input: MultipleDetectionsType,
) => {
  return await prisma.vehicle.findMany({
    where: {
      vehicleNumber: {
        in: input.map((d) => d.vehicleNumber),
      },
    },
    select: {
      vehicleNumber: true,
      type: true,
      vehicleTags: { select: { tag: { select: { id: true, name: true } } } },
    },
  });
};

type VehiclesWithTags = Prisma.PromiseReturnType<typeof getVehiclesWithTags>;

// get video source and its settings
const getVideoSourceConfig = (
  prisma: PrismaClient,
  multipleDetections: MultipleDetectionsType,
) => {
  const sourceIds = [...new Set(multipleDetections.map((m) => m.sourceId))];
  return prisma.videoSource.findMany({
    where: { id: { in: sourceIds } },
    select: {
      id: true,
      name: true,
      location: true,
      storeAll: true,
      storeMismatch: true,
      storeTag: true,
      storeViolations: true,
      notifyAll: true,
      notifyMismatch: true,
      notifyTag: true,
      notifyViolations: true,
    },
  });
};

type VideoSourceConfig = Prisma.PromiseReturnType<
  typeof getVideoSourceConfig
>[number];

type ComputeDetectionsInput = {
  detection: z.infer<typeof detectionGroupSchema>;
  videoSources: VideoSourceConfig[];
  vehicles: VehiclesWithTags;
};

const computeDetections = ({
  detection,
  vehicles,
  videoSources,
}: ComputeDetectionsInput) => {
  const matchedVehicle = vehicles.find(
    (v) => v.vehicleNumber === detection.vehicleNumber,
  );
  const videoSource = videoSources.find((v) => v.id === detection.sourceId);

  if (!videoSource) {
    throw new NotFoundError("Source doesn't exist!");
  }

  const hasViolations = !!detection.violations.length;
  const hasMismatch =
    matchedVehicle && matchedVehicle.type !== detection.vehicleType;
  const hasTags = !!matchedVehicle?.vehicleTags?.length;

  const toStore =
    videoSource.storeAll ||
    (videoSource.storeViolations && hasViolations) ||
    (videoSource.storeMismatch && hasMismatch) ||
    (videoSource.storeTag && hasTags);

  const toNotify =
    videoSource.notifyAll ||
    (videoSource.notifyViolations && hasViolations) ||
    (videoSource.notifyMismatch && hasMismatch) ||
    (videoSource.notifyTag && hasTags);

  return {
    computed: {
      source: {
        id: detection.sourceId,
        name: videoSource.name,
        location: videoSource.location,
      },
      ...detection,

      matchedVehicle,
      hasMismatch,
    },
    toStore,
    toNotify,
  };
};

type UndefinedProperties<T> = {
  [P in keyof T]-?: undefined extends T[P] ? P : never;
}[keyof T];

type UndefinedToOptional<T> = Partial<Pick<T, UndefinedProperties<T>>> &
  Omit<T, UndefinedProperties<T>>;

export type ComputedDetection = UndefinedToOptional<
  ReturnType<typeof computeDetections>["computed"]
>;

const upsertDetections = (prisma: PrismaClient, detection: ComputedDetection) =>
  prisma.detection.upsert({
    where: {
      id_sourceId: { id: detection.detectionId, sourceId: detection.sourceId },
    },
    create: {
      id: detection.detectionId,
      plateImage: detection.plateImage,
      startAt: new Date(detection.startAt),
      endAt: new Date(detection.endAt),
      source: { connect: { id: detection.sourceId } },
      vehicleNumber: detection.vehicleNumber,
      vehicleType: detection.vehicleType,
      matchedVehicle: {
        connect: !detection.matchedVehicle
          ? undefined
          : { vehicleNumber: detection.vehicleNumber },
      },
      violations: {
        createMany: {
          data: detection.violations.map((v) => ({
            violationType: v.type,
            at: new Date(v.at),
          })),
        },
      },
    },
    update: {
      endAt: new Date(detection.endAt),
      violations: {
        deleteMany: {
          violationType: { in: detection.violations.map((v) => v.type) },
        },
        createMany: {
          data: detection.violations.map((v) => ({
            violationType: v.type,
            at: new Date(v.at),
          })),
        },
      },
    },
    select: {
      startAt: true,
      endAt: true,
      matchedVehicle: true,
      matchedVehicleNumber: true,
      source: true,
      sourceId: true,
      vehicleNumber: true,
      vehicleType: true,
      createdAt: true,
      modifiedAt: true,
      violations: true,
      id: true,
    },
  });

const handleDetectionEvent = async (
  ctx: Context,
  detections: z.infer<typeof multipleDetectionsSchema>,
) => {
  if (detections.length <= 0) {
    console.log("No detections present for approval, Returning.");
    return null;
  }

  // get all the vehicles for the detections
  const vehicles = await getVehiclesWithTags(ctx.prisma, detections);

  // get the configuration for all the video sources
  const videoSources = await getVideoSourceConfig(ctx.prisma, detections);

  const { store, notify } = detections.reduce(
    (acc, detection) => {
      const { computed, toNotify, toStore } = computeDetections({
        detection,
        vehicles,
        videoSources,
      });
      if (toStore) {
        acc.store.push(computed);
      }
      if (toNotify) {
        acc.notify.push({ ...computed, plateImage: "" });
      }
      return acc;
    },
    { store: [] as ComputedDetection[], notify: [] as ComputedDetection[] },
  );

  try {
    await ctx.prisma.$transaction(
      store.map((s) => upsertDetections(ctx.prisma, s)),
    );
  } catch (err) {
    console.log("UPSERT ERROR", err, {
      d: store.map((i) => ({
        detectionId: i.detectionId,
        sourceId: i.sourceId,
        violation: i.violations,
      })),
    });
  }

  const notifyFiltered = notify.filter((n) =>
    ctx.realtimeDetectionStringList
      .getInstance()
      .add(`${n.sourceId}_${n.detectionId}`),
  );
  if (notifyFiltered.length > 0) {
    detectionNotification.emit("detection", notifyFiltered);
  }

  const toStore = store.map((s) => ({
    sourceId: s.sourceId,
    detectionId: s.detectionId,
  }));

  return { store: toStore };
};

export const listenDetectionUpdates = authedProcedure
  .input(detectionUpdatesSchema)
  .mutation(async ({ ctx, input }) => {
    if (input.type === "detection") {
      const response = await handleDetectionEvent(ctx, input.data);
      return response;
    }
    return null;
  });

export const realtimeDetectionUpdates = publicProcedure.subscription(() => {
  return observable<ComputedDetection[]>((emit) => {
    const onPush = (data: ComputedDetection[]) => {
      // emit data to client
      emit.next(data);
    };
    // trigger `onAdd()` when `add` is triggered in our event emitter
    detectionNotification.on("detection", onPush);
    // unsubscribe function when client disconnects or stops subscribing
    return () => {
      detectionNotification.off("detection", onPush);
    };
  });
});
