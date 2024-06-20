// utils/trpc.ts
import { createTRPCReact } from "@trpc/react-query";
import {
	inferRouterError,
	inferRouterInputs,
	inferRouterOutputs,
} from "@trpc/server";
import type AppRouter from "tvds-server";

export const trpc = createTRPCReact<AppRouter>();

export type TrpcRouterInput = inferRouterInputs<AppRouter>;
export type TrpcRouterOutput = inferRouterOutputs<AppRouter>;
export type TrpcRouterError = inferRouterError<AppRouter>;
