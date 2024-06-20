import { paginatorSchema } from "../paginator";
import { authedProcedure, router } from "../trpc";
import { z } from "zod";

export enum DetectionSourceType {
  OVERVIEW = "OVERVIEW",
  ANPR = "ANPR",
}

const detectionSourceFilterArgsSchema = z.object({
  fromDate: z.string().datetime().optional(),
  toDate: z
    .string()
    .datetime()
    .optional()
    .transform((arg) => (!arg ? arg : new Date(arg))),
  id: z.number().optional(),
  url: z.string().url().optional(),
  name: z.string().nonempty().optional(),
  location: z.string().nonempty().optional(),
  type: z.nativeEnum(DetectionSourceType),
});

export const getDetectionSources = authedProcedure
  .input(paginatorSchema.merge(detectionSourceFilterArgsSchema))
  .query(async ({ ctx, input }) => {
    // FIXME: implement a filter based on the requirement for the front end.

    const sources = await ctx.prisma.videoSource.findMany({
      take: input.take,
      skip: input.skip,
      cursor: input.cursor ? { id: input.cursor } : undefined,
      where: {
        createdAt: {
          gte: input.fromDate,
          lte: input.toDate,
        },
        url: { contains: input.url },
        id: input.id,
        name: { contains: input.name },
        location: { contains: input.location },
      },
      orderBy: { createdAt: "desc" },
    });

    return sources;
  });

export const detectionSourceRouter = router({
  getDetectionSources,
});
