import "../styles/globals.css";

import type { AppProps } from "next/app";
import { wrapper } from "../store/store";
import { NotificationsProvider } from "@mantine/notifications";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  MantineProvider,
  ColorScheme,
  ColorSchemeProvider,
} from "@mantine/core";
import { Layout } from "../components/Layout/Layout";
import { ModalsProvider } from "@mantine/modals";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import utc from "dayjs/plugin/utc";
import { useLocalStorage } from "@mantine/hooks";
import DeleteModal from "../components/DeleteModal/DeleteModal";
import { DELETE_CONFIRMATION } from "../constants/modals";
import dynamic from "next/dynamic";

dayjs.extend(utc);
dayjs.extend(localizedFormat);

const MyApp = (props: AppProps) => {
  const { Component, pageProps } = props;

  const router = useRouter();

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "color-scheme",
    defaultValue: "light",
  });
  const [showing, setShowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleColorScheme = () =>
    setColorScheme((current) => (current === "dark" ? "light" : "dark"));

  const handleRouteStart = () => {
    setIsLoading(true);
  };

  const handleRouteDone = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    setShowing(true);

    router.events.on("routeChangeStart", handleRouteStart);
    router.events.on("routeChangeComplete", handleRouteDone);
    router.events.on("routeChangeError", handleRouteDone);

    // Solution for => Error: Hydration failed because the initial UI does not match what was rendered on the server.

    return () => {
      router.events.off("routeChangeStart", handleRouteStart);
      router.events.off("routeChangeComplete", handleRouteDone);
      router.events.off("routeChangeError", handleRouteDone);
    };
  }, []);

  if (!showing) {
    return null;
  }
  if (typeof window === "undefined") {
    return <></>;
  } else {
    return (
      <>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              /** Put your mantine theme override here */
              colorScheme,
            }}
          >
            <NotificationsProvider limit={5} position="top-right">
              <ModalsProvider modals={{ [DELETE_CONFIRMATION]: DeleteModal }}>
                {isLoading ? (
                  // <LoadingOverlay visible />
                  <div />
                ) : (
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                )}
              </ModalsProvider>
            </NotificationsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </>
    );
  }
};

export default wrapper.withRedux(MyApp);
