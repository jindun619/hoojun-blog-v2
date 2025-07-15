import type { InferGetStaticPropsType } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";

import { useSetRecoilState } from "recoil";
import { navbarParamsState } from "@/recoil/state";

import { SEO } from "@/components/SEO";
import { Bio } from "@/components/Bio";
import { CardsArea } from "@/components/CardsArea";
import { JsonLd, createWebSiteSchema, createPersonSchema } from "@/components/JsonLd";

import { getSortedPostsData } from "../../lib/posts";

import GitHubCalendar from "react-github-calendar";

export default function IndexPage({
  allPostsData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const setNavbarParams = useSetRecoilState(navbarParamsState);

  useEffect(() => {
    console.log("Welcome to Hoojun.Kim");

    const processedPostsData = allPostsData.map((post) => {
      return {
        category: post.frontmatter.category,
        tags: post.frontmatter.tags,
      };
    });
    setNavbarParams(processedPostsData);
  }, [allPostsData]);

  // 웹사이트 스키마 데이터 생성
  const websiteSchema = createWebSiteSchema({
    name: "Hoojun.Kim",
    description: "김호준의 개발 블로그입니다. 웹 개발, 프로그래밍, 정보통신공학 관련 기술 포스트를 공유합니다.",
    url: "https://blog.hoojun.kim",
    authorName: "김호준",
  });

  // 사람 스키마 데이터 생성
  const personSchema = createPersonSchema({
    name: "김호준",
    url: "https://blog.hoojun.kim/about",
    imageUrl: "https://blog.hoojun.kim/asset/bio-image.PNG",
    jobTitle: "풀스택 개발자",
    description: "상해교통대학교에서 정보통신공학을 전공하고 있는 김호준입니다. 풀스택 개발자로 성장하기 위해, 다양한 기술을 배우고 프로젝트에 적용하는 데에 열정을 가지고 있습니다.",
    sameAs: [
      "https://github.com/jindun619"
    ],
  });

  return (
    <>
      <SEO 
        title="홈" 
        description="김호준의 개발 블로그입니다. 웹 개발, 프로그래밍, 정보통신공학 관련 기술 포스트를 공유합니다." 
        keywords="김호준, 개발 블로그, 웹 개발, 프로그래밍, 정보통신공학, 풀스택 개발자" 
      />
      <JsonLd data={websiteSchema} />
      <JsonLd data={personSchema} />
      {/* BIO */}
      <div className="mt-16">
        <Bio />
      </div>
      <div className="mt-16">
        <GitHubCalendar username="jindun619" />
      </div>
      <article className="prose">
        <figcaption className="ml-4 mt-4">{`총 ${allPostsData.length}개의 포스트`}</figcaption>
      </article>
      <CardsArea data={allPostsData} />
    </>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
