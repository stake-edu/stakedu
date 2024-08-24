import { RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProps } from "next/app";
import Head from "next/head";
import { WagmiProvider } from "wagmi";

import "../css/global.css";
import { getConfig } from "../wagmi";

const queryClient = new QueryClient();
const myTheme = lightTheme();

myTheme.colors.accentColor = "#9E00FF";
myTheme.fonts.body = "Instrument Sans";
myTheme.shadows.connectButton = "none";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        // Responsive meta tag
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <WagmiProvider config={getConfig()}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider theme={myTheme}>
            <Component {...pageProps} />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}
export default MyApp;
