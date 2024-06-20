import { z } from "zod";
import { authedProcedure } from "../trpc";
import { PrismaClient } from "@prisma/client";

export enum DropdownType {
  Tag = "Tag",
  Detector = "Detector",
  Recorder = "Recorder",
  VideoSource = "VideoSource",
}

const dropdownMapping = (prisma: PrismaClient) =>
  ({
    [DropdownType.Detector]: prisma.detector,
    [DropdownType.Recorder]: prisma.recorder,
    [DropdownType.VideoSource]: prisma.videoSource,
    [DropdownType.Tag]: prisma.tagType,
  } as const);

export const getDropdown = authedProcedure

  .input(
    z.object({
      type: z.nativeEnum(DropdownType),
    }),
  )
  .query(async ({ input, ctx }) => {
    const dropdown = dropdownMapping(ctx.prisma)[
      input.type
    ] as typeof ctx.prisma.tagType;

    return await dropdown.findMany();
  });
