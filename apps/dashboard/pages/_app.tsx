import Head from "next/head";
import { useRouter } from "next/router";

import "@grinn/styles/dist/output.css";
import { ApolloProviderWrapper, TokenContext } from "@grinn/lib";
import { setAccessToken, getAccessToken } from "../lib/accessToken";

import "react-circular-progressbar/dist/styles.css";
import Script from "next/script";
import { useState } from "react";
function MyApp({ Component, pageProps }) {
  const [myAccessToken, setMyAccessToken] = useState("");
  return (
    <>
      <Head>
        <title>Dashboard du starter Grinn</title>
        <meta
          name="description"
          content="Dashboard du starter Grinn, qui doit utiliser Mantine pour le développement"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width" />

        <meta
          name="google-signin-client_id"
          content="128517360182-uqnaqd02h6ab6f65uragsmh0j6no516q.apps.googleusercontent.com"
        />
      </Head>
      <Script src="https://apis.google.com/js/platform.js"></Script>
      <TokenContext.Provider
        value={{ accessToken: myAccessToken, setAccessToken: setMyAccessToken }}
      >
        <ApolloProviderWrapper
          endpoint={process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}
        >
          <Component {...pageProps} />
        </ApolloProviderWrapper>
      </TokenContext.Provider>
    </>
  );
}
export default MyApp;
