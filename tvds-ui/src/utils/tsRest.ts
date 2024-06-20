import { initQueryClient } from "@ts-rest/react-query";
import { contract } from "tvds-server/src/ts_rest/contract";

export const client = initQueryClient(contract, {
	baseUrl: "http://localhost:9005",
	baseHeaders: {},
});