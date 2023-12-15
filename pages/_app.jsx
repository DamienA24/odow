import Head from "next/head";
import { SessionProvider } from "next-auth/react";

import "styles/globals.scss";

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <Head>
        <title>ONE DAY ONE WORKOUT</title>
        <meta name="application-name" content="ODOW" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="ODOW" />
        <meta
          name="description"
          content="ODOW: Simplify your fitness with a unique workout each day. Perfect for all levels, no equipment needed."
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#c9df6b" />
        {/*         <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
         */}{" "}
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/icons/arm-152.png"
        />
        {/*   <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/favicon-16x16.png"
        /> */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="ONE DAY ONE WORKOUT - Simplify Your Fitness"
        />
        <meta
          property="og:description"
          content="Join ODOW for effective, accessible daily sessions suitable for everyone."
        />
        <meta property="og:site_name" content="ODOW" />
        <meta property="og:url" content="https://onedayoneworkout.com" />
        <meta
          property="og:image"
          content="https://onedayoneworkout.com/icons/arm-512.png"
        />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}
