import { credentials } from "@grpc/grpc-js";
import { DetectorConfigServiceClient } from "../../../gen/detector/configuration_grpc_pb";
import { RecorderConfigServiceClient } from "../../../gen/recorder/configuration_grpc_pb";

import {
  DetectorConfigRequest,
  DetectorConfigResponse,
} from "../../../gen/detector/configuration_pb";
import {
  RecorderConfigRequest,
  RecorderConfigResponse,
} from "../../../gen/recorder/configuration_pb";
import { authedProcedure } from "../../trpc";
import { z } from "zod";
import { Context } from "../../context";
import { getRandomBytes, isValidJson } from "../../util";
import { RefreshTokenType } from "@prisma/client";
import { ValidationError } from "../../errors";

export type DetectorConfigKeyType = "server_url" | "refresh_token";

const addSystemNodeSchema = z
  .object({
    type: z.enum(["DETECTOR", "RECORDER"]),
    name: z.string().nonempty(),
    url: z.string().nonempty(),
    url2: z.string().nonempty().optional(),
    force: z.boolean(),
    config: z.string().nonempty().optional(),
  })
  .refine(
    (args) => {
      if (args.type === "RECORDER" && !args.url2) {
        return false;
      } else {
        return true;
      }
    },
    { message: "URL 2 for recorder must not be empty" },
  )
  .superRefine((arg, ctx) => {
    if (arg.config && !isValidJson(arg.config)) {
      ctx.addIssue({
        message: "Invalid Json Config",
        code: "custom",
      });
    }
  });

type AddSystemNodeInput = z.infer<typeof addSystemNodeSchema>;

const createRecorder = async (ctx: Context, input: AddSystemNodeInput) => {
  const { name, url, url2 } = input;

  // config needs to be stringified and is either an stringified object or empty string
  const config = input.config || "";

  const client = new RecorderConfigServiceClient(
    url,
    credentials.createInsecure(),
  );

  const request = new RecorderConfigRequest()
    .setConfiguration(JSON.stringify(config))
    .setForce(input.force);

  const response = await ctx.prisma.$transaction(async (tx) => {
    await tx.recorder.create({
      data: { name, url, url2: url2 as string, isActive: true },
    });

    return await new Promise<RecorderConfigResponse.AsObject>(
      (resolve, reject) => {
        client.initialize(request, (err, res) => {
          // console.log("Response ======>", res);
          // console.log("Error =>>>>", err);

          if (err) {
            // console.error(
            //   "Error from grpc initialize recorder: ",
            //   JSON.stringify(err),
            // );
            reject(err);
          } else {
            // console.log(
            //   "Return from grpc initialize recorder: ",
            //   JSON.stringify(res.toObject()),
            // );
            resolve(res.toObject());
          }
        });
      },
    );
  });

  return response;
};

const createDetector = async (ctx: Context, input: AddSystemNodeInput) => {
  const { name, url } = input;
  const config = JSON.parse(input.config || "") as Record<string, string>;
  const refresh_token = await getRandomBytes(100);

  const client = new DetectorConfigServiceClient(
    url,
    credentials.createInsecure(),
  );

  const request = new DetectorConfigRequest()
    .setConfiguration(
      JSON.stringify({
        server_url: config?.server_url || "",
        refresh_token,
      } as Record<DetectorConfigKeyType, string>),
    )
    .setForce(input.force);

  const response = await ctx.prisma.$transaction(async (tx) => {
    await tx.refreshToken.create({
      data: { token: refresh_token, type: RefreshTokenType.Detector },
    });

    await tx.detector.create({
      data: { name, url, isActive: true },
    });

    console.log("Request configuration :", request.getConfiguration());

    return await new Promise<DetectorConfigResponse.AsObject>(
      (resolve, reject) => {
        client.initialize(request, (err, res) => {
          // console.log("Response ======>", res);
          // console.log("Error =>>>>", err);

          if (err) {
            console.error(
              "Error from grpc initialize detector: ",
              JSON.stringify(err),
            );
            reject(err);
          } else {
            console.log(
              "Return from grpc initialize detector: ",
              JSON.stringify(res?.toObject?.()),
            );
            resolve(res.toObject());
          }
        });
      },
    );
  });

  return response;
};

export const addSystemNode = authedProcedure
  .input(addSystemNodeSchema)
  .mutation(async ({ ctx, input }) => {
    if (input.type === "DETECTOR") {
      return await createDetector(ctx, input);
    } else if (input.type === "RECORDER") {
      return await createRecorder(ctx, input);
    } else {
      throw new ValidationError(`Invalid System node type ${input.type}`);
    }
  });
