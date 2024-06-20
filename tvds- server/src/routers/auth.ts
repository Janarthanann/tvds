import { generateRefreshToken, signToken, verifyPassword } from "../util";
import { publicProcedure, router } from "../trpc";
import { z } from "zod";
import { AuthorizationError, NotAllowedError, NotFoundError } from "../errors";
import { RefreshToken, RefreshTokenType } from "@prisma/client";
import { Logger } from "../log";
import { Config } from "../config";

export const loginInputSchema = z.object({
  username: z.string().nonempty(),
  password: z.string().nonempty(),
});

const logger = Logger.getInstance();

export type AuthTokenPayload = {
  userName: string;
  iat: number;
  exp: number;
};

export const login = publicProcedure
  .input(loginInputSchema)
  .mutation(async ({ ctx, input }) => {
    const user = await ctx.prisma.user.findUnique({
      where: {
        name: input.username,
      },
    });

    if (
      !user ||
      !user.isActive ||
      !(await verifyPassword(input.password, user.password))
    ) {
      throw new AuthorizationError("Invalid Credentials");
    }

    const token = await signToken(user.name, RefreshTokenType.User);
    return {
      token,
      user: {
        name: user.name,
        createdAt: user.createdAt,
        passwordChangeAt: user.passwordChangeAt,
      },
    };
  });

export const login2 = publicProcedure
  .input(loginInputSchema)
  .mutation(async ({ ctx, input }) => {
    const config = await Config.getInstance();
    const user = await ctx.prisma.user.findUnique({
      where: {
        name: input.username,
      },
    });

    if (!user || !(await verifyPassword(input.password, user.password))) {
      throw new AuthorizationError("Invalid Credentials");
    }

    if (!user.isActive) {
      throw new NotAllowedError("Invalid Access");
    }

    const accessToken = await signToken(user.name, RefreshTokenType.User);

    const refreshToken = generateRefreshToken(120);

    // TODO: Add expiry for users

    const expirationTime =
      new Date().getTime() +
      parseInt(config.RefreshTokenValidityInMilliseconds);

    const expirationDateTime = new Date(expirationTime);

    // const tokenRefresh =
    await ctx.prisma.refreshToken.upsert({
      where: { userName: user.name },
      create: {
        token: refreshToken,
        type: RefreshTokenType.User,
        user: { connect: { name: user.name } },
        expiresAt: expirationDateTime,
      },
      update: {
        token: refreshToken,
        expiresAt: expirationDateTime,
      },
    });

    return {
      token: accessToken,
      // tokenRefresh,
      refreshToken,
      user: {
        name: user.name,
        createdAt: user.createdAt,
        passwordChangeAt: user.passwordChangeAt,
      },
    };
  });

export const refresh = publicProcedure
  .input(z.object({ refreshToken: z.string().nonempty() }))
  .mutation(async ({ ctx, input }) => {
    const refreshToken: RefreshToken | null =
      await ctx.prisma.refreshToken.findUnique({
        where: { token: input.refreshToken },
      });

    const currentDateTime = new Date();
    if (refreshToken?.expiresAt && refreshToken?.expiresAt < currentDateTime) {
      await ctx.prisma.refreshToken.delete({
        where: { token: input.refreshToken },
      });

      throw new NotFoundError("Refresh token expired");
    }

    if (!refreshToken) {
      throw new NotFoundError("Refresh token not found!");
    }

    const accessToken = await signToken(
      refreshToken.userName as string,
      refreshToken.type,
    );

    console.log(accessToken, "access token from refresh api");

    return { accessToken };
  });

export const logout = publicProcedure
  .input(
    z.object({
      refreshToken: z.string().nonempty(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    try {
      await ctx.prisma.refreshToken.delete({
        where: { token: input.refreshToken },
      });
      return true;
    } catch (error) {
      logger.warn(error, "Error in logout:");
      return false;
    }
  });

export const authRouter = router({
  login,
  login2,
  refresh,
  logout,
});
