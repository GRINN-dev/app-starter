import Head from "next/head";

import "@grinn/styles/dist/output.css";
import { ApolloProviderWrapper, TokenContext } from "@grinn/lib";
import { UserContext } from "./auth";

import "react-circular-progressbar/dist/styles.css";
import Script from "next/script";
import { useEffect, useState } from "react";
import { useContext } from "react";
function MyApp({ Component, pageProps }) {
  const [myAccessToken, setMyAccessToken] = useState("");
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // intended to be called when <App /> mounts, normally init time.
    // If a valid refresh_token is in the cookie, we fetch and store an access_token
    fetch("http://localhost:8000/refresh_token", {
      method: "POST",
      credentials: "include",
    })
      .then(async response => {
        const { access_token } = await response.json();
        setMyAccessToken(access_token); // store in browser/page memory only, not persisted to local storage
        // setUser({email})
      })
      .catch(err => {
        console.error("unable to connect to auth server", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
      </Head>

      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
      ></Script>

      <Script src="https://apis.google.com/js/platform.js"></Script>
      <TokenContext.Provider
        value={{ accessToken: myAccessToken, setAccessToken: setMyAccessToken }}
      >
        <ApolloProviderWrapper
          endpoint={process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}
        >
          <UserContext.Provider value={{ user: user, setUser: setUser }}>
            <Component {...pageProps} />
          </UserContext.Provider>
        </ApolloProviderWrapper>
      </TokenContext.Provider>
    </>
  );
}
export default MyApp;
