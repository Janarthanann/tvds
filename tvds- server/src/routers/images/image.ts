import { z } from "zod";
import { authedProcedure, router } from "../../trpc";
import { ImageResponse, InputMsg } from "../../../gen/recorder/image_pb";
import * as GrpcRecorderClient from "../../../gen/recorder/image_grpc_pb";
import { NotFoundError } from "../../errors";
import { credentials } from "@grpc/grpc-js";
import { Context } from "../../context";

const inputSchema = z.object({
  from: z.number(),
  to: z.number(),
  id: z.number(),
});

const deleteImageSchema = z.object({
  from: z.number().optional(),
  to: z.number(),
  id: z.number(),
});

const createImageClient = async (sourceId: number, ctx: Context) => {
  const videoSource = await ctx.prisma.videoSource.findUnique({
    where: { id: sourceId },
    include: { recorder: true },
  });

  if (!videoSource) {
    throw new NotFoundError("Source not found!");
  }

  const url = videoSource.recorder.url;
  const client = new GrpcRecorderClient.ImageClient(
    url,
    credentials.createInsecure(),
  );

  return client;
};

export const getImages = authedProcedure
  .input(inputSchema)
  .query(async ({ input, ctx }) => {
    const { id, from, to } = input;

    const client = await createImageClient(input.id, ctx);

    const inputMsg = new InputMsg()
      .setId(id)
      .setFrom(from?.toString())
      .setTo(to.toString());
    console.log("Input", inputMsg.toObject());

    const asyncResponse = await new Promise<ImageResponse.AsObject>(
      (resolve, reject) => {
        client.retrieveImages(inputMsg, (err, response) => {
          if (err || !response) {
            console.log("Error ===>", err);
            reject(err);
          }
          return resolve(response?.toObject());
        });
      },
    );

    return asyncResponse;
  });

export const deleteImages = authedProcedure
  .input(deleteImageSchema)
  .mutation(async ({ input, ctx }) => {
    const { id, from, to } = input;
    const client = await createImageClient(input.id, ctx);

    const inputMsg = new InputMsg()
      .setId(id)
      .setFrom(from?.toString() || "")
      .setTo(to.toString());

    return await new Promise((res, rej) => {
      client.deleteImages(inputMsg, (err, response) => {
        if (err) {
          rej(err);
          return;
        }
        res(response.toObject());
      });
    });
  });

export const imagesRouter = router({
  getImages,
  deleteImages,
});
