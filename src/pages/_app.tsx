import type { AppProps } from "next/app";
import "../styles/globals.css";

import { Noto_Sans_KR } from "next/font/google";

import { Layout } from "@/components/Layout";

const notoSansKr = Noto_Sans_KR({ subsets: ["latin"] });

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <main className={notoSansKr.className}>
        <Component {...pageProps} />
      </main>
    </Layout>
  );
};

export default App;
