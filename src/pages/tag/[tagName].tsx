import * as React from "react";
import { GetStaticProps, GetStaticPaths } from "next";

import { SEO } from "@/components/SEO";
import { CardsArea } from "@/components/CardsArea";
import { TagBtn } from "@/components/TagBtn";

import { getSortedPostsData } from "../../../lib/posts";

import { PostProps } from "../../../types/types";

export default function TagPage({
  selectedTag,
  allPostsData,
}: {
  selectedTag: string;
  allPostsData: PostProps[];
}) {
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

  return (
    <>
      <SEO title="태그" description="태그" />
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
