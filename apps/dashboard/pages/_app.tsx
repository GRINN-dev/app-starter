import Head from "next/head";
import { useRouter } from "next/router";

import "@grinn/styles/dist/output.css";
import { ApolloProviderWrapper } from "@grinn/lib";

import "react-circular-progressbar/dist/styles.css";
import Script from "next/script";
function MyApp({ Component, pageProps }) {
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
      <Script
        src="https://accounts.google.com/gsi/client"
        onLoad={data => {
          console.log("test: ", data);
          var tokenClient;

          console.log(
            "🚀 ~ file: _app.tsx ~ line 31 ~ MyApp ~ tokenClient",
            tokenClient
          );
        }}
        strategy="afterInteractive"
      ></Script>

      <Script id="google-signin" strategy="afterInteractive">
        {`
         console.log("afterinteractive")
         function handleCredentialResponse(response) {
          console.log("🚀 ~ file: _app.tsx ~ line 38 ~ handleCredentialResponse ~ response", response)
          tokenClient = google.accounts.oauth2.initTokenClient({
            client_id: '128517360182-uqnaqd02h6ab6f65uragsmh0j6no516q.apps.googleusercontent.com',
            scope: 'http://localhost:6785',
            callback: (tokenResponse) => {
              access_token = tokenResponse.access_token;
            },
          });
       }
        `}
      </Script>
      <ApolloProviderWrapper
        endpoint={process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}
      >
        <Component {...pageProps} />
      </ApolloProviderWrapper>
    </>
  );
}
export default MyApp;
