import Head from "next/head";
import { useRouter } from "next/router";

import "@grinn/styles/dist/output.css";
import { ApolloProviderWrapper } from "../../../@grinn/lib";

import "react-circular-progressbar/dist/styles.css";

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
      <ApolloProviderWrapper
        endpoint={process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}
      >
        <Component {...pageProps} />
      </ApolloProviderWrapper>
    </>
  );
}
export default MyApp;
