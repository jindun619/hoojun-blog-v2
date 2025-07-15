import { useState, useEffect } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";

import { getSortedPostsData } from "../../../lib/posts";
import { markdownToHtml, htmlToText } from "@/utils/utils";

import { SEO } from "@/components/SEO";
import { Post } from "@/components/Post";
import { JsonLd, createBlogPostingSchema, createBreadcrumbSchema } from "@/components/JsonLd";

import { PostProps } from "../../../types/types";

export default function PostPage({ postData }: { postData: PostProps }) {
  const router = useRouter();
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
    const url = `https://blog.hoojun.kim${router.asPath}`;
    const imageUrl = frontmatter?.coverImage 
      ? `https://blog.hoojun.kim${frontmatter.coverImage}` 
      : "https://blog.hoojun.kim/asset/og-image.png";
    
    // 블로그 포스트 스키마
    const blogPostingSchema = createBlogPostingSchema({
      title: frontmatter.title,
      description: excerpt,
      url: url,
      imageUrl: imageUrl,
      datePublished: frontmatter.date,
      authorName: "김호준",
      authorUrl: "https://blog.hoojun.kim/about",
      publisherName: "Hoojun.Kim",
      publisherLogo: "https://blog.hoojun.kim/asset/bio-image.PNG",
      keywords: frontmatter.tags,
    });
    
    // 빵 부스러기 스키마
    const breadcrumbSchema = createBreadcrumbSchema({
      items: [
        { name: "홈", url: "https://blog.hoojun.kim" },
        { name: frontmatter.category, url: `https://blog.hoojun.kim/category/${frontmatter.category}` },
        { name: frontmatter.title, url: url },
      ],
    });
    
    return (
      <>
        <SEO 
          title={frontmatter?.title} 
          description={excerpt} 
          article={true}
          keywords={frontmatter?.tags?.join(", ")}
          image={frontmatter?.coverImage || "/asset/og-image.png"}
          publishedTime={frontmatter?.date}
          modifiedTime={frontmatter?.lastmod || frontmatter?.date}
        />
        <JsonLd data={blogPostingSchema} />
        <JsonLd data={breadcrumbSchema} />
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
