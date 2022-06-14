import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        {/*   <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `window.$crisp=[];window.CRISP_WEBSITE_ID="ff3c546e-8486-4be1-bd10-45de988cf2bf";(function(){ d=document;s=d.createElement("script"); s.src="https://client.crisp.chat/l.js"; s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`,
          }}
        ></script> */}
      </Head>
      <body>
        <Main />

        <NextScript />
      </body>
    </Html>
  );
}
