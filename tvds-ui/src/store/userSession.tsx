import { SerializeObject } from "@trpc/server/shared";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const userSessionKey = "userSession";

export interface UserSessionData
{
	token: string | null;
	refreshToken: string | null;
	user: {
		name: string;
		createdAt: Date;
		passwordChangeAt: Date;
	} | null;
}

const userSessionInnerAtom = atomWithStorage<UserSessionData | null>(userSessionKey, null);

export const userSessionAtom = atom(
	(get): UserSessionData | null =>
	{
		const userSession = get(userSessionInnerAtom);
		if (!userSession)
		{
			return null;
		}
		return get(userSessionInnerAtom);
	},
	(get, set, value: UserSessionData | null) =>
	{
		set(userSessionInnerAtom, value);
	},
);
