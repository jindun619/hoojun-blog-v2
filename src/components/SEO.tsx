import Head from "next/head";

interface SEOProps {
  title: string;
  description: string;
}
export function SEO({ title, description }: SEOProps) {
  const siteName = "Hoojun.Kim";

  return (
    <Head>
      <title>{`${title} | ${siteName}`}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      {/* <meta property="og:image" content={""} /> */}
      <meta property="og:description" content={description} />
      <link rel="sitemap" type="application/xml" href="/sitemap-index.xml" />

      {/* Search Engine Verifications */}
      <meta
        name="google-site-verification"
        content="_ugXUv4-9ZFkQIhcRLxyyHKcnw1eQKy6qIrko9xhsak"
      />
      <meta
        name="naver-site-verification"
        content="7f7e83e47f7dedbdc99bfc301d8566a29c7dbbe8"
      />
    </Head>
  );
}
