import Head from "next/head";
import { useRouter } from "next/router";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string | string[];
  author?: string;
  url?: string;
  image?: string;
  article?: boolean;
  locale?: string;
  alternateLocales?: { locale: string; url: string }[];
  prevPage?: string;
  nextPage?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export function SEO({
  title,
  description,
  article = false,
  keywords = [],
  author = "김호준",
  image = "/asset/og-image.png",
  locale = "ko_KR",
  alternateLocales = [],
  url: customUrl,
  prevPage,
  nextPage,
  publishedTime,
  modifiedTime,
}: SEOProps) {
  const router = useRouter();
  const siteName = "Hoojun.Kim";
  const url = customUrl || `https://blog.hoojun.kim${router.asPath}`;
  const canonicalUrl = url.split("?")[0];
  
  return (
    <Head>
      <title>{`${title} | ${siteName}`}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <link rel="canonical" href={canonicalUrl} />
      {keywords && (
        <meta name="keywords" content={Array.isArray(keywords) ? keywords.join(", ") : keywords} />
      )}
      <meta name="author" content={author} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={`${title} | ${siteName}`} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={`https://blog.hoojun.kim${image}`} />
      <meta property="og:locale" content={locale} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={`${title} | ${siteName}`} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`https://blog.hoojun.kim${image}`} />
      
      {/* Hreflang 태그 */}
      <link rel="alternate" hrefLang={locale.substring(0, 2)} href={canonicalUrl} />
      {alternateLocales.map((alt) => (
        <link key={alt.locale} rel="alternate" hrefLang={alt.locale.substring(0, 2)} href={alt.url} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />
      
      {/* 페이지네이션 링크 */}
      {prevPage && <link rel="prev" href={prevPage} />}
      {nextPage && <link rel="next" href={nextPage} />}
      
      {/* 게시물 시간 정보 (블로그 포스트일 경우) */}
      {article && publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {article && modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {article && <meta property="article:author" content={`https://blog.hoojun.kim/about`} />}
      
      {/* Sitemap */}
      <link rel="sitemap" type="application/xml" href="/sitemap-index.xml" />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      
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
