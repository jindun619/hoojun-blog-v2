import * as React from "react";
import Link from "next/link";
import { GetStaticProps, GetStaticPaths } from "next";

import { SEO } from "@/components/SEO";
import { CardsArea } from "@/components/CardsArea";
import { CategoryBtn } from "@/components/CategoryBtn";

import { getSortedPostsData } from "../../../lib/posts";

import { PostProps } from "../../../types/types";

export default function CategoryPage({
  selectedCategory,
  allPostsData,
}: {
  selectedCategory: string;
  allPostsData: PostProps[];
}) {
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

  return (
    <>
      <SEO title="카테고리" description="카테고리" />
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
    fallback: true, // false or "blocking"
  };
}) satisfies GetStaticPaths;
