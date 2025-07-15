import * as React from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import Head from "next/head";

import { SEO } from "@/components/SEO";
import { CardsArea } from "@/components/CardsArea";
import { TagBtn } from "@/components/TagBtn";

import { getSortedPostsData } from "../../../lib/posts";

import { PostProps } from "../../../types/types";

export default function TagPage({
  selectedTag,
  allPostsData,
  page = 1,
  totalPages = 1,
}: {
  selectedTag: string;
  allPostsData: PostProps[];
  page?: number;
  totalPages?: number;
}) {
  const router = useRouter();
  const selectedPostsData = allPostsData.filter((post) => {
    return post.frontmatter.tags.includes(selectedTag);
  });
  const tagsSet = new Set<string>();
  allPostsData.forEach((item, idx) => {
    item.frontmatter.tags.forEach((tag: string) => {
      if (tag) {
        tagsSet.add(tag);
      }
    });
  });
  const allTags = [...tagsSet];
  const showTags = allTags.map((it, idx) => {
    var count = 0;
    allPostsData.map((post) => {
      if (post.frontmatter.tags.includes(it)) {
        count++;
      }
    });

    return (
      <TagBtn
        key={idx}
        name={`${it}(${count})`}
        href={`/tag/${it}`}
        isActive={it === selectedTag}
      />
    );
  });

  // 태그 페이지에 대한 상세 설명 생성
  const tagDescription = `${selectedTag} 태그의 글 목록입니다. 김호준의 개발 블로그에서 ${selectedTag} 관련 포스트를 확인하세요.`;
  
  // 현재 URL 가져오기
  const currentUrl = `https://blog.hoojun.kim${router.asPath}`;
  const baseUrl = `https://blog.hoojun.kim/tag/${selectedTag}`;
  
  // 페이지네이션을 위한 URL 생성
  const canonicalUrl = baseUrl;
  // 페이지네이션은 현재 구현되지 않았으므로 임시로 비활성화
  const prevPageUrl = null;
  const nextPageUrl = null;

  return (
    <>
      <SEO 
        title={`#${selectedTag} 태그`} 
        description={tagDescription}
        keywords={`${selectedTag}, 김호준 블로그, 개발 블로그, 프로그래밍`}
        url={canonicalUrl}
      />
      
      {/* 페이지네이션 구현 후 활성화 예정 */}
      {/* <Head>
        {prevPageUrl && <link rel="prev" href={prevPageUrl} />}
        {nextPageUrl && <link rel="next" href={nextPageUrl} />}
      </Head> */}
      
      <div className="max-w-2xl pt-16 mx-auto">
        <article className="prose">
          <h1 className="ml-4"># {selectedTag}</h1>
          <div className="flex flex-wrap gap-2 ml-4">{showTags}</div>
          <figcaption className="ml-4">{`총 ${selectedPostsData.length}개의 포스트`}</figcaption>
        </article>
        <CardsArea data={selectedPostsData} />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const tagName = params?.tagName;
  const allPostsData = getSortedPostsData();
  return {
    props: {
      selectedTag: tagName,
      allPostsData,
    },
  };
};

interface tagListProps {
  params: {
    tagName: string;
  };
}
export const getStaticPaths = (async () => {
  const allPostsData = getSortedPostsData();
  const tagsSet = new Set<string>();
  allPostsData.forEach((item) => {
    item.frontmatter.tags.forEach((tag: string) => {
      if (tag) {
        tagsSet.add(tag);
      }
    });
  });
  const allTags = [...tagsSet];
  const tagList: tagListProps[] = [];
  allTags.map((post) => {
    tagList.push({
      params: {
        tagName: post,
      },
    });
  });

  return {
    paths: tagList,
    fallback: false,
  };
}) satisfies GetStaticPaths;
