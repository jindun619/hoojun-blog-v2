import type { InferGetStaticPropsType } from "next";
import { useEffect, useState, useMemo } from "react";

import { useNavbar } from "@/context/NavbarContext";

import { SEO } from "@/components/SEO";
import { Bio } from "@/components/Bio";
import { CardsArea } from "@/components/CardsArea";
import { JsonLd, createWebSiteSchema, createPersonSchema } from "@/components/JsonLd";

import { getSortedPostsData } from "../../lib/posts";

import GitHubCalendar from "react-github-calendar";

export default function IndexPage({
  allPostsData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { setNavbarParams } = useNavbar();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // 카테고리와 태그 목록 추출
  const categories = useMemo(() => {
    return [...new Set(allPostsData.map((post) => post.frontmatter.category))];
  }, [allPostsData]);

  const tags = useMemo(() => {
    const tagsSet = new Set<string>();
    allPostsData.forEach((post) => {
      post.frontmatter.tags?.forEach((tag: string) => {
        if (tag) tagsSet.add(tag);
      });
    });
    return [...tagsSet];
  }, [allPostsData]);

  // 필터링된 포스트
  const filteredPosts = useMemo(() => {
    return allPostsData.filter((post) => {
      const categoryMatch = !selectedCategory || post.frontmatter.category === selectedCategory;
      const tagMatch = !selectedTag || post.frontmatter.tags?.includes(selectedTag);
      return categoryMatch && tagMatch;
    });
  }, [allPostsData, selectedCategory, selectedTag]);

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

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedTag(null);
  };

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

      {/* 필터 섹션 */}
      <div className="mt-16">
        {/* 카테고리 필터 */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-medium text-base-content/60">Categories</span>
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-xs text-primary hover:underline"
              >
                Clear
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(
                  selectedCategory === category ? null : category
                )}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-primary text-primary-content"
                    : "bg-base-200 text-base-content/70 hover:bg-base-300 hover:text-base-content"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* 태그 필터 */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-medium text-base-content/60">Tags</span>
            {selectedTag && (
              <button
                onClick={() => setSelectedTag(null)}
                className="text-xs text-secondary hover:underline"
              >
                Clear
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(
                  selectedTag === tag ? null : tag
                )}
                className={`px-2.5 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
                  selectedTag === tag
                    ? "bg-secondary text-secondary-content"
                    : "bg-base-200 text-base-content/60 hover:bg-base-300 hover:text-base-content"
                }`}
              >
                # {tag}
              </button>
            ))}
          </div>
        </div>

        {/* 필터 상태 표시 */}
        {(selectedCategory || selectedTag) && (
          <div className="flex items-center gap-2 mt-4 p-3 bg-base-200/50 rounded-lg">
            <span className="text-sm text-base-content/70">필터:</span>
            {selectedCategory && (
              <span className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded">
                {selectedCategory}
              </span>
            )}
            {selectedTag && (
              <span className="px-2 py-0.5 text-xs bg-secondary/10 text-secondary rounded">
                # {selectedTag}
              </span>
            )}
            <button
              onClick={clearFilters}
              className="ml-auto text-xs text-base-content/50 hover:text-base-content"
            >
              모두 지우기
            </button>
          </div>
        )}
      </div>

      <article className="prose mt-8">
        <figcaption className="ml-4">
          {`총 ${filteredPosts.length}개의 포스트`}
          {(selectedCategory || selectedTag) && ` (전체 ${allPostsData.length}개)`}
        </figcaption>
      </article>
      <CardsArea data={filteredPosts} />
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
