import { UserSessionData, userSessionKey } from "./store/userSession";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type AppRouter from "tvds-server";
import superjson from "superjson";
import ErrorMsg from "./components/common/errors";

export const fetcher = async (
  info: RequestInfo | URL,
  serverUrl: string,
  userStore: UserSessionData | null,
  setUserSession: (session: UserSessionData | null) => void,
  options?: RequestInit
) => {
  const userSessionString = localStorage.getItem(userSessionKey);

  const userSession: UserSessionData = JSON.parse(userSessionString as string);

  if (userSession?.token) {
    options = {
      ...options,
      headers: {
        ...options?.headers,
        authorization: `Bearer ${userSession.token}`,
      },
    };
  }

  const response = await fetch(info, options);

  if (response.status === 401 && userSession?.refreshToken) {
    try {
      const client = createTRPCProxyClient<AppRouter>({
        transformer: superjson,
        links: [httpBatchLink({ url: serverUrl })],
      });
      const refreshResponse = await client.auth.refresh.mutate({
        refreshToken: userSession.refreshToken,
      });

      const accessToken = refreshResponse.accessToken;

      if (accessToken) {
        localStorage.setItem(
          userSessionKey,
          JSON.stringify({ ...userSession, token: accessToken })
        );
        options = {
          ...options,
          headers: {
            ...options?.headers,
            authorization: `Bearer ${accessToken}`,
          },
        };
        return await fetch(info, options);
      }
    } catch (error) {
      console.log("log after refresh fails");
      ErrorMsg(error as { message?: string });
      setUserSession(null);
      // localStorage.removeItem(userSessionKey);
    }
  }

  return response;
};
