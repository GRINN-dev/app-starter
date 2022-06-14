import { useEffect } from "react";
import Head from "next/head";
import Script from "next/script";

import "@grinn/styles/dist/output.css";
import { ApolloProviderWrapper } from "@grinn/lib";
import { ClientOnly } from "@grinn/components";

import { useCookie } from "react-use";

import { CookieConsent } from "../components/CookieConsent";

function MyApp({ Component, pageProps }) {
  const [hasAcceptedCookies] = useCookie("hasAcceptedCookies");

  useEffect(() => {
    (window as any)?.gtag("consent", "default", {
      ad_storage: hasAcceptedCookies === "all" ? "granted" : "denied",
      analytics_storage: hasAcceptedCookies === "all" ? "granted" : "denied",
    });
  }, [hasAcceptedCookies]);

  return (
    <>
      <Head>
        <title>Le starter très chouette de Grinn</title>
        <meta
          name="description"
          content="Créez votre app rapidement avec le starter très chouette de Grinn"
        />
        <meta property="og:image" content="/og-meta-img.png" />

        <meta property="og:title" content="Le starter très chouette de Grinn" />

        <meta
          property="og:description"
          content="Créez votre app rapidement avec le starter très chouette de Grinn"
        />
        <meta property="og:image:width" content="1200"></meta>
        <meta property="og:image:height" content="675"></meta>
        <meta property="og:locale" content="fr"></meta>
        <meta name="twitter:card" content="summary_large_image"></meta>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width" />
      </Head>
      <Script
        id="datalayer-and-gtag-activation"
        dangerouslySetInnerHTML={{
          __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}

                gtag('consent', 'default', {
                  'ad_storage': 'denied',
                  'analytics_storage': 'denied'
                });
            `,
        }}
      />
      <Script
        id="gtm-script"
        dangerouslySetInnerHTML={{
          __html: `
              (function (w, d, s, l, i) {
                w[l] = w[l] || [];
                w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
                var f = d.getElementsByTagName(s)[0],
                  j = d.createElement(s),
                  dl = l != "dataLayer" ? "&l=" + l : "";
                j.async = true;
                j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
                f.parentNode.insertBefore(j, f);
              })(window, document, "script", "dataLayer", "GTM-XXXXXX");
            `,
        }}
      ></Script>
      <ClientOnly>
        <CookieConsent />
      </ClientOnly>

      <ApolloProviderWrapper
        endpoint={process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}
      >
        <Component {...pageProps} />
      </ApolloProviderWrapper>
    </>
  );
}
export default MyApp;
