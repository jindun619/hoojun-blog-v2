import { useState, useEffect } from "react";
import { GetStaticProps, GetStaticPaths } from "next";

import { getSortedPostsData } from "../../../lib/posts";
import { markdownToHtml, htmlToText } from "@/utils/utils";

import { SEO } from "@/components/SEO";
import { Post } from "@/components/Post";

import { PostProps } from "../../../types/types";

export default function PostPage({ postData }: { postData: PostProps }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [html, setHtml] = useState<string>("");

  //calculate progress bar percentage
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight =
        document.documentElement.scrollHeight - windowHeight;
      const scrollPercentage = (window.scrollY / documentHeight) * 100;
      setScrollProgress(scrollPercentage);
    };
    window.addEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    (async () => {
      const content = postData?.content;
      const convertedHtml = await markdownToHtml(content);
      setHtml(convertedHtml);
    })();
  }, [postData]);

  const frontmatter = postData?.frontmatter;

  const excerpt = htmlToText(html).substring(0, 200);
  if (frontmatter) {
    return (
      <>
        <SEO title={frontmatter?.title} description={excerpt} />
        <progress
          className="progress progress-primary bg-blue-100 fixed top-0 left-0 w-full h-1"
          value={scrollProgress}
          max="100"></progress>
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
