import React, { useState } from "react";
import { useAtom } from "jotai";
import {
  TRPCWebSocketClient,
  createWSClient,
  httpBatchLink,
  splitLink,
  wsLink,
} from "@trpc/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { userSessionAtom } from "./store/userSession";
import { trpc } from "./utils/trpc";
import AppRouter from "./AppRouter";
import { ConfigProvider, theme } from "antd";
import { computedThemeAtom, systemThemeAtom, ThemeType } from "./store/theme";
import { Loading } from "./components/common/error";
import { fetcher } from "./fetch";
import { config } from "../config";
import superjson from "superjson";

function App() {
  const [userSession, setUserSession] = useAtom(userSessionAtom);
  const [loading, setLoading] = useState(true);

  const [, setDarkSystemTheme] = useAtom(systemThemeAtom);
  const [computedTheme] = useAtom(computedThemeAtom);

  const queryClient = React.useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            queryKeyHashFn: (key: unknown) => superjson.stringify(key),
          },
        },
      }),
    []
  );

  const wsClient = React.useMemo(() => {
    if (loading) {
      return null;
    }

    const WS_URL = new URL(config.WS_URL);
    WS_URL.searchParams.append("token", userSession?.token || "");

    return createWSClient({ url: WS_URL.toString() });
  }, [loading, userSession?.token]);

  const trpcClient = React.useMemo(() => {
    if (loading || !wsClient) return null;

    const HTTP_URL = new URL("/trpc", config.SERVER_URL).toString();

    const httpLink = httpBatchLink({
      url: HTTP_URL,
      fetch: (url, options) =>
        fetcher(url, HTTP_URL, userSession, setUserSession, {
          ...options,
          credentials: "include",
        }),
      //   headers: () => ({ authorization: `Bearer ${userSession?.token}` }),
    });

    return trpc.createClient({
      transformer: superjson,
      links: [
        splitLink({
          condition: (op) => op.type === "subscription",
          true: wsLink({ client: wsClient }),
          false: httpLink,
        }),
      ],
    });
  }, [userSession, wsClient, loading]);

  React.useEffect(() => {
    setLoading(false);
  }, []);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setDarkSystemTheme(mediaQuery.matches ? ThemeType.Dark : ThemeType.Light);
    const handleChange = (event: MediaQueryListEvent) => {
      setDarkSystemTheme(event.matches ? ThemeType.Dark : ThemeType.Light);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
      if (wsClient) {
        wsClient.close();
      }
    };
  }, [setDarkSystemTheme]);

  return loading || !trpcClient ? (
    <Loading />
  ) : (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider
          theme={{
            algorithm:
              computedTheme === ThemeType.Dark
                ? theme.darkAlgorithm
                : theme.defaultAlgorithm,
            token: {
              borderRadius: 3,
            },
          }}
        >
          <AppRouter />
        </ConfigProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
