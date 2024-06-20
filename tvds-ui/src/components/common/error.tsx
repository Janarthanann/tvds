import React from "react";
import { TrpcRouterError } from "../../utils/trpc";

export function Error({ error }: { error: unknown }) {

	return (
		<div className="m-auto font-medium">
			{(error as  TrpcRouterError).message}
		</div>
	);
}


export function Loading() {
	return (
		<div className="flex justify-center items-center h-full text-center">
			<div className="flex flex-col items-center">
				<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
				<div className="py-2">Loading...</div>
			</div>
		</div>
	);
}
