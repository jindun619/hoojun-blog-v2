import { useState, useEffect } from "react";
import { GetStaticProps, GetStaticPaths } from "next";

import Prism from "prismjs";
import "prismjs/components/prism-typescript.min";
import "prismjs/components/prism-python.min";
import "prismjs/themes/prism-tomorrow.css";

import { getSortedPostsData } from "../../../lib/posts";
import { markdownToHtml, htmlToText } from "@/utils/utils";

import { SEO } from "@/components/SEO";
import { Post } from "@/components/Post";

import { PostProps } from "../../../types/types";

export default function PostPage({ postData }: { postData: PostProps }) {
  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    (async () => {
      const content = postData?.content;
      const convertedHtml = await markdownToHtml(content);
      setHtml(convertedHtml);
    })();
  }, [postData]);

  useEffect(() => {
    Prism.highlightAll();
  }, [html]);

  const frontmatter = postData?.frontmatter;

  const excerpt = htmlToText(html).substring(0, 200);
  if (frontmatter) {
    return (
      <>
        <SEO title={frontmatter?.title} description={excerpt} />
        <Post
          slug={frontmatter.slug}
          title={frontmatter.title}
          category={frontmatter.category}
          tags={frontmatter.tags}
          date={frontmatter.date}
          references={frontmatter.references}
          html={html}
        />
      </>
    );
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const allPostsData = getSortedPostsData();
  const postData = allPostsData.find((post) => {
    return post.frontmatter.slug === `/${params?.postId}`;
  });
  return {
    props: {
      postData,
    },
  };
};

interface PostListProps {
  params: {
    postId: string;
  };
}
export const getStaticPaths = (async () => {
  const allPostsData = getSortedPostsData();
  const postList: PostListProps[] = [];
  allPostsData.map((post) => {
    postList.push({
      params: {
        postId: post.frontmatter.slug.substring(1),
      },
    });
  });
  return {
    paths: postList,
    fallback: true,
  };
}) satisfies GetStaticPaths;
