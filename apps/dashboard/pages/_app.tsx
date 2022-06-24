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
      </Head>

      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
      ></Script>

      <Script id="google-signin" strategy="afterInteractive">
        {`
          console.log("afterinteractive")
      
          function handleCredentialResponse(response) {
            console.log("🚀 ~ file: _app.tsx ~ line 38 ~ handleCredentialResponse ~ response", response)
           
            fetch("http://localhost:8000/verify-gsign?token="+response.credential, {
              method: "POST",
            }).then(res => {
              console.log("Request complete! response:", res);
            }).catch(err=>console.log(err));
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
