import { type Config as PrismaConfig, ConfigType } from "@prisma/client";
import { Prisma } from "../prisma";
import { createAsyncSingleton } from "../singleton";
import { type DefaultKeyConfigType, configData } from "./default_values";

/**
 * Reads configuration from database
 * @returns configuration
 */
export const Config = createAsyncSingleton({
  async init() {
    const prisma = Prisma.getInstance();

    const upsertQueries = Object.entries(configData).map((entry) => {
      const [key, value] = entry as [ConfigType, string];
      return prisma.config.upsert({
        where: { key },
        update: {},
        create: { key, value },
      });
    });

    const response = await prisma.$transaction(upsertQueries);
    const modifiedResponse = response.reduce((acc, conf: PrismaConfig) => {
      acc[conf.key] = conf.value;
      return acc;
    }, {} as Record<string, string>) as Record<DefaultKeyConfigType, string>;

    return modifiedResponse;
  },
});
