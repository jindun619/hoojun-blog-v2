import type { InferGetStaticPropsType } from "next";
import { useEffect } from "react";

import { useSetRecoilState } from "recoil";
import { navbarParamsState } from "@/recoil/state";

import { SEO } from "@/components/SEO";
import { Bio } from "@/components/Bio";
import { CardsArea } from "@/components/CardsArea";

import { getSortedPostsData } from "../../lib/posts";

import GitHubCalendar from "react-github-calendar";

export default function IndexPage({
  allPostsData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
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

  return (
    <>
      <SEO title="홈" description="홈" />
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
