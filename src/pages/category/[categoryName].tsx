import Link from "next/link";
import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import Head from "next/head";

import { SEO } from "@/components/SEO";
import { CardsArea } from "@/components/CardsArea";
import { CategoryBtn } from "@/components/CategoryBtn";

import { getSortedPostsData } from "../../../lib/posts";

import { PostProps } from "../../../types/types";

export default function CategoryPage({
  selectedCategory,
  allPostsData,
  page = 1,
  totalPages = 1,
}: {
  selectedCategory: string;
  allPostsData: PostProps[];
  page?: number;
  totalPages?: number;
}) {
  const router = useRouter();
  const selectedPostsData = allPostsData.filter((post) => {
    return post.frontmatter.category === selectedCategory;
  });
  const allCategories = [
    ...new Set(allPostsData.map((item) => item.frontmatter.category)),
  ];
  const showCategories = allCategories.map((it, idx) => {
    var count = 0;
    allPostsData.map((post) => {
      if (post.frontmatter.category === it) {
        count++;
      }
    });

    return (
      <Link
        key={idx}
        href={`/category/${it}`}
        style={{ textDecoration: "none" }}>
        <CategoryBtn
          name={`${it}(${count})`}
          isOutlined={it !== selectedCategory}
        />
      </Link>
    );
  });

  // 카테고리 페이지에 대한 상세 설명 생성
  const categoryDescription = `${selectedCategory} 카테고리의 글 목록입니다. 김호준의 개발 블로그에서 ${selectedCategory} 관련 포스트를 확인하세요.`;
  
  // 현재 URL 가져오기
  const currentUrl = `https://blog.hoojun.kim${router.asPath}`;
  const baseUrl = `https://blog.hoojun.kim/category/${selectedCategory}`;
  
  // 페이지네이션을 위한 URL 생성
  const canonicalUrl = baseUrl;
  // 페이지네이션은 현재 구현되지 않았으므로 임시로 비활성화
  const prevPageUrl = null;
  const nextPageUrl = null;

  return (
    <>
      <SEO 
        title={`${selectedCategory} 카테고리`} 
        description={categoryDescription}
        keywords={`${selectedCategory}, 김호준 블로그, 개발 블로그, 프로그래밍`}
        url={canonicalUrl}
      />
      
      {/* 페이지네이션 구현 후 활성화 예정 */}
      {/* <Head>
        {prevPageUrl && <link rel="prev" href={prevPageUrl} />}
        {nextPageUrl && <link rel="next" href={nextPageUrl} />}
      </Head> */}
      
      <div className="max-w-2xl pt-16 mx-auto">
        <article className="prose">
          <h1 className="ml-4">
            Category: <span className="text-primary">{selectedCategory}</span>
          </h1>
          <div className="flex flex-wrap gap-2 ml-4">{showCategories}</div>
          <figcaption className="ml-4">{`총 ${selectedPostsData.length}개의 포스트`}</figcaption>
        </article>
        <CardsArea data={selectedPostsData} />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const categoryName = params?.categoryName;
  const allPostsData = getSortedPostsData();
  return {
    props: {
      selectedCategory: categoryName,
      allPostsData,
    },
  };
};

interface CategoryListProps {
  params: {
    categoryName: string;
  };
}
export const getStaticPaths = (async () => {
  const allPostsData = getSortedPostsData();
  const allCategories = [
    ...new Set(allPostsData.map((item) => item.frontmatter.category)),
  ];
  const categoryList: CategoryListProps[] = [];
  allCategories.map((post) => {
    categoryList.push({
      params: {
        categoryName: post,
      },
    });
  });

  return {
    paths: categoryList,
    fallback: false,
  };
}) satisfies GetStaticPaths;
