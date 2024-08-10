import { useEffect } from "react";

import Head from "next/head";

import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function Layout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.querySelector("html")?.setAttribute("data-theme", "myTheme");
  }, []);
  return (
    <div>
      <Head>
        <meta name="theme-color" content="#0070ed"></meta>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/asset/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/asset/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/asset/favicon-16x16.png"
        />
      </Head>
      <Navbar />
      <div className="max-w-2xl mx-auto min-h-screen">{children}</div>
      <Footer />
    </div>
  );
}
