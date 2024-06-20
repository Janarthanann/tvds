import { ConfigType } from "@prisma/client";

export const configData = {
  [ConfigType.Host]: "0.0.0.0",
  [ConfigType.Port]: "9005",
  [ConfigType.Salt]: "saltstring",
  [ConfigType.TrpcEndpoint]: "/trpc",
  [ConfigType.JwtTokenValidity]: "1 day",
  [ConfigType.RefreshTokenValidityInMilliseconds]: "432000000",
  [ConfigType.TrpcPlayGroundEndpoint]: "/trpc-playground",
} as const;

export type DefaultKeyConfigType = keyof typeof configData;
