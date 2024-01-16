import type { AppProps } from "next/app";
import "../styles/globals.css";
import { RecoilRoot } from "recoil";

import { Noto_Sans_KR } from "next/font/google";

import { Layout } from "@/components/Layout";

const notoSansKr = Noto_Sans_KR({ subsets: ["latin"] });

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <Layout>
        <main className={notoSansKr.className}>
          <Component {...pageProps} />
        </main>
      </Layout>
    </RecoilRoot>
  );
};

export default App;
