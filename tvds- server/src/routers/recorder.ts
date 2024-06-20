import { authedProcedure, router } from "../trpc";
import { paginatorSchema } from "../paginator";
import { z } from "zod";

// INFO: this is exported since declaration: true is set for ts, it needs this type to properly emit the type files
export enum RecorderRelation {
  RECORDER_INFO = "RECORDER_INFO",
  STATUS = "STATUS",
}

const recorderFilterArgsSchema = z.object({
  fromDate: z.string().datetime().optional(),
  toDate: z.string().datetime().optional(),
  id: z.number().optional(),
  url: z.string().min(2).optional(),
  name: z.string().min(2).optional(),
  relations: z.nativeEnum(RecorderRelation).array().default([]),
});

export const getRecorders = authedProcedure
  .input(recorderFilterArgsSchema.merge(paginatorSchema))
  .query(async ({ ctx, input }) => {
    const { take, skip, cursor, ...filter } = input;
    const paginator = { take, skip, cursor };

    const recorders = await ctx.prisma.recorder.findMany({
      take: paginator.take,
      skip: paginator.skip,
      cursor: paginator.cursor ? { id: paginator.cursor } : undefined,
      where: {
        createdAt: {
          gte: filter.fromDate,
          lte: filter.toDate,
        },
        url: { contains: filter.url },
        id: { equals: filter.id },
        name: { contains: filter.name },
      },
    });
    return recorders;
  });

export const recorderRouter = router({
  getRecorders,
});
