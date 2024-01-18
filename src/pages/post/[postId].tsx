import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { GetStaticProps, GetStaticPaths } from "next";

import Prism from "prismjs";
import "prismjs/components/prism-typescript.min";
import "prismjs/components/prism-python.min";
import "prismjs/themes/prism-tomorrow.css";

import { getSortedPostsData } from "../../../lib/posts";
import { markdownToHtml } from "../../../lib/markdownToHtml";
import { htmlToText } from "../../../lib/htmlToText";

import { SEO } from "@/components/SEO";
import { CategoryBtn } from "@/components/CategoryBtn";
import { TagBtn } from "@/components/TagBtn";
import { Bio } from "@/components/Bio";

import { PostProps } from "../../../types/types";

export default function PostPage({ postData }: { postData: PostProps }) {
  const [html, setHtml] = useState<string>("");
  const [imgValid, setImgValid] = useState<boolean>(true);

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

  useEffect(() => {
    // FADE IN TRANSITION
    const fadeInTransition = document.querySelector(".fadeInTransition");
    if (fadeInTransition) {
      fadeInTransition.classList.remove("opacity-0");
    }
  });

  const frontmatter = postData?.frontmatter;

  const featuredImageUrl = `/post_images${frontmatter?.slug}/fi.png`;

  const showTags = frontmatter?.tags.map((node: string, idx: number) => (
    <TagBtn key={idx} name={node} href={`/tag/${node}`} />
  ));

  const showReferences = frontmatter?.references.map((node: string) => (
    <div key={node}>
      <Link href={node} className="text-primary hover:decoration-double">
        {node}
      </Link>
    </div>
  ));

  const excerpt = htmlToText(html).substring(0, 200);
  if (frontmatter) {
    return (
      <>
        <SEO title={frontmatter?.title} description={excerpt} />
        <div className="max-w-2xl mx-auto pt-16 px-4 md:px-0 opacity-0 fadeInTransition">
          <div className="mb-2">
            <Link href={`/category/${frontmatter?.category}`}>
              <CategoryBtn name={frontmatter?.category} isActive={true} />
            </Link>
          </div>
          <article className="prose max-w-none">
            <header>
              <h1>{frontmatter?.title || ""}</h1>
              <p>{frontmatter?.date}</p>
              <div>{showTags}</div>
            </header>
            {/* Featured Image */}
            {imgValid ? (
              <div className="relative h-80 mb-10">
                <Image
                  src={featuredImageUrl}
                  alt="featuredImage"
                  fill={true}
                  style={{ borderRadius: "20px" }}
                  onError={() => {
                    setImgValid(false);
                  }}
                />
              </div>
            ) : (
              ""
            )}
            <div
              dangerouslySetInnerHTML={{ __html: html }}
              className="mdSyntax pb-8 border-b-2"
            />
            <div
              className={
                frontmatter?.references.length !== 0 ? "border-b-2 pb-8" : ""
              }>
              <h2>{frontmatter?.references.length !== 0 ? "참고" : ""}</h2>
              {showReferences}
            </div>
          </article>
          <div className="pt-8 pb-16">
            <Bio />
          </div>
        </div>
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
    fallback: true, // false or "blocking"
  };
}) satisfies GetStaticPaths;
