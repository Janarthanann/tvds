import { authedProcedure } from "../../trpc";
import { detectionPaginatorSchema } from "../../paginator";
import { z } from "zod";
import { AlreadyExistsError, NotFoundError } from "../../errors";
import { VehicleType, ViolationType } from "@prisma/client";

const detectionsFilterSchema = z
  .object({
    detectionId: z.bigint().optional(),
    vehicleNumber: z.string().optional(),
    startTime: z.string().datetime().optional(),
    endTime: z.string().datetime().optional(),
    location: z.string().nonempty().optional(),
    tagIds: z.number().array().optional(),
  })
  .merge(detectionPaginatorSchema)
  .strip();

export const getDetections = authedProcedure
  .input(detectionsFilterSchema)
  .query(async ({ ctx, input }) => {
    const {
      take,
      skip,
      increasing,
      detectionId,
      startTime,
      endTime,
      vehicleNumber,
      location,
      tagIds,
    } = input;
    const filter = {
      detectionId,
      startTime,
      endTime,
      vehicleNumber,
      location,
      tagIds,
    };

    const isFilterEmpty: boolean =
      Object.values(filter).filter((i) => i).length === 0;

    console.log("filter empty", isFilterEmpty);
    console.log("filters", input);

    return await ctx.prisma.detection.findMany({
      take,
      skip,
      where: isFilterEmpty
        ? undefined
        : {
            id: input.detectionId,
            createdAt:
              startTime || endTime
                ? {
                    gte: filter.startTime,
                    lte: filter.endTime,
                  }
                : undefined,
            vehicleNumber: { contains: vehicleNumber, mode: "insensitive" },
            source: !input.location
              ? undefined
              : { location: { contains: input.location, mode: "insensitive" } },
            matchedVehicle: !input.tagIds
              ? undefined
              : { vehicleTags: { some: { tagId: { in: input.tagIds } } } },
          },
      select: {
        id: true,
        vehicleNumber: true,
        vehicleType: true,
        matchedVehicle: {
          select: {
            vehicleNumber: true,
            color: true,
            type: true,
            vehicleTags: {
              where: !input.tagIds
                ? undefined
                : { tagId: { in: input.tagIds } },
              select: {
                tag: {
                  select: { id: true, name: true },
                },
              },
            },
          },
        },
        violations: { select: { violationType: true } },
        createdAt: true,
        source: { select: { name: true, location: true } },
        sourceId: true,
      },
      orderBy: { createdAt: increasing ? "asc" : "desc" },
    });
  });

export const getDetection = authedProcedure
  .input(
    z.object({
      id: z.bigint(),
      sourceId: z.number(),
    }),
  )
  .query(async ({ ctx, input }) => {
    return await ctx.prisma.detection.findUnique({
      where: { id_sourceId: { id: input.id, sourceId: input.sourceId } },
      select: {
        id: true,
        plateImage: true,
        vehicleNumber: true,
        vehicleType: true,
        matchedVehicle: {
          select: {
            vehicleNumber: true,
            color: true,
            type: true,
            vehicleTags: {
              select: { tag: { select: { id: true, name: true } } },
            },
          },
        },
        startAt: true,
        endAt: true,
        violations: { select: { violationType: true } },
        createdAt: true,
        source: {
          select: {
            name: true,
            location: true,
            latitude: true,
            longitude: true,
          },
        },
        sourceId: true,
      },
    });
  });

const updateDetectionSchema = z.object({
  sourceId: z.number().int(),
  id: z.number().int(),
  plateImage: z.string().optional(),
  startAt: z.number().optional(),
  endAt: z.number().optional(),
  vehicleNumber: z.string().optional(),
  vehicleType: z.nativeEnum(VehicleType).optional(),
  vehicleColor: z.string().optional(),
  violations: z.nativeEnum(ViolationType).array().optional(),
  tagId: z.number().array().default([]),
});

export const updateDetection = authedProcedure
  .input(updateDetectionSchema)
  .mutation(async ({ ctx, input }) => {
    /* This is a query to update the detection in the database. */
    const now = new Date();

    try {
      const detection = await ctx.prisma.detection.update({
        where: { id_sourceId: { id: input.id, sourceId: input.sourceId } },
        data: {
          violations: !input.violations
            ? undefined
            : {
                deleteMany: { violationType: { notIn: input.violations } },
                createMany: {
                  data: input.violations?.map((v) => ({
                    violationType: v,
                    at: now,
                  })),
                  skipDuplicates: true,
                },
              },
          vehicleNumber: input.vehicleNumber,
          vehicleType: input.vehicleType,
        },
        include: {
          matchedVehicle: true,
        },
      });

      return detection;
    } catch (error) {
      const oldDetection = await ctx.prisma.detection.findUniqueOrThrow({
        where: {
          id_sourceId: {
            id: input.id,
            sourceId: input.sourceId,
          },
        },
      });

      if (!oldDetection) {
        throw new NotFoundError("Detection does not exist");
      }

      const vehicle = await ctx.prisma.vehicle.findUnique({
        where: { vehicleNumber: input.vehicleNumber },
      });

      if (vehicle) {
        throw new AlreadyExistsError(
          "Vehicle Number provided already exists!, kindly provide a new vehicle ID to update",
        );
      }

      throw error;
    }
  });

export const trackVehicle = authedProcedure
  .input(
    z.object({
      vehicleNumber: z.string().nonempty(),
      limit: z.number().default(10),
    }),
  )
  .query(async ({ ctx, input }) => {
    const res = await ctx.prisma.videoSource.findMany({
      where: { detections: { some: { vehicleNumber: input.vehicleNumber } } },
      include: {
        detections: {
          take: input.limit,
          where: { vehicleNumber: input.vehicleNumber },
          orderBy: { startAt: "asc" },
          select: {
            startAt: true,
            endAt: true,
            vehicleNumber: true,
            vehicleType: true,
          },
        },
      },
    });

    return res.sort((a, b) => {
      const minA = a.detections[0].startAt;
      const minB = b.detections[0].startAt;
      return minA.getTime() - minB.getTime();
    });
  });
