/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://blog.hoojun.kim",
  generateRobotsTxt: true,
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ["/server-sitemap.xml"], // 동적으로 생성되는 사이트맵이 있다면 제외
  robotsTxtOptions: {
    additionalSitemaps: [
      "https://blog.hoojun.kim/server-sitemap.xml", // 동적으로 생성되는 사이트맵이 있다면 추가
    ],
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/*", "/_next/*"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
      },
      {
        userAgent: "Yeti", // 네이버 검색엔진
        allow: "/",
      },
    ],
  },
  transform: async (config, path) => {
    // 특정 경로에 대한 우선순위 조정
    if (path === "/") {
      return {
        loc: path,
        changefreq: config.changefreq,
        priority: 1.0,
        lastmod: new Date().toISOString(),
      };
    }
    
    // 블로그 포스트에 대한 우선순위 조정
    if (path.startsWith("/post/")) {
      return {
        loc: path,
        changefreq: "weekly",
        priority: 0.8,
        lastmod: new Date().toISOString(),
      };
    }
    
    // 카테고리 페이지에 대한 우선순위 조정
    if (path.startsWith("/category/")) {
      return {
        loc: path,
        changefreq: "weekly",
        priority: 0.6,
        lastmod: new Date().toISOString(),
      };
    }
    
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    };
  },
};
