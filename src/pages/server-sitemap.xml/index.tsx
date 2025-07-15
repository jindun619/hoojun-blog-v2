import { GetServerSideProps } from 'next';
import { ISitemapField } from 'next-sitemap';
import { getSortedPostsData } from '../../../lib/posts';
import { NextApiResponse } from 'next';

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // 응답 헤더 설정
  if (res) {
    res.setHeader('Content-Type', 'text/xml');
    res.setHeader('Cache-Control', 'public, s-maxage=1200, stale-while-revalidate=600');
  }
  
  // 모든 포스트 데이터 가져오기
  const allPostsData = getSortedPostsData();
  
  // 포스트 데이터를 사이트맵 필드로 변환
  const fields: ISitemapField[] = allPostsData.map((post) => ({
    loc: `https://blog.hoojun.kim/post/${post.frontmatter.slug.substring(1)}`,
    lastmod: new Date().toISOString(),
    changefreq: 'weekly',
    priority: 0.8,
  }));
  
  // 카테고리 페이지 추가
  const categories = [...new Set(allPostsData.map(post => post.frontmatter.category))];
  categories.forEach(category => {
    fields.push({
      loc: `https://blog.hoojun.kim/category/${category}`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.6,
    });
  });
  
  // 태그 페이지 추가
  const tags = [...new Set(allPostsData.flatMap(post => post.frontmatter.tags || []))];
  tags.forEach(tag => {
    fields.push({
      loc: `https://blog.hoojun.kim/tag/${tag}`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.5,
    });
  });
  
  // XML 형식의 사이트맵 생성
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${fields
        .map((field) => {
          return `
            <url>
              <loc>${field.loc}</loc>
              <lastmod>${field.lastmod}</lastmod>
              <changefreq>${field.changefreq}</changefreq>
              <priority>${field.priority}</priority>
            </url>
          `;
        })
        .join('')}
    </urlset>
  `;
  
  // XML 응답 반환
  if (res) {
    res.write(sitemap);
    res.end();
  }
  
  return {
    props: {},
  };
};

// 빈 기본 내보내기 - Next.js 요구사항
export default function Sitemap() {}
