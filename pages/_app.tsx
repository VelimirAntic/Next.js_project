import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.scss";
import "../styles/app.scss";
import "../styles/elements.scss";
import "react-toastify/dist/ReactToastify.css";
import Script from "next/script";

function MyApp({ Component, pageProps }: any) {
  const pageLayout = Component.layout || ((page: any) => page);

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap");
  }, []);

  return pageLayout(
    <>
      {/* Google Analytics */}
      <Script
        id="google-anaylics1"
        strategy="lazyOnload"
        src="https://www.googletagmanager.com/gtag/js?id=G-S0XHMQLS64"
      ></Script>

      <Script id="google-anaylics2" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-S0XHMQLS64');
        `}
      </Script>

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
