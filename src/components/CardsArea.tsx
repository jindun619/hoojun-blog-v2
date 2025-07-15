import { useEffect } from "react";

import { Card } from "./Card";

import { PostProps } from "../../types/types";

export function CardsArea({ data }: { data: PostProps[] }) {
  useEffect(() => {
    // FADE IN TRANSITION
    const fadeInTransition = document.querySelector(".fadeInTransition");
    if (fadeInTransition) {
      fadeInTransition.classList.remove("opacity-0");
    }
  });

  return (
    <div className="mt-8 pt-8 border-t border-base-300 opacity-0 fadeInTransition">
      {data.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {data.map((it, idx) => (
            <Card
              key={idx}
              category={it.frontmatter.category}
              title={it.frontmatter.title}
              content={it.content} //excerpt
              date={it.frontmatter.date}
              tags={it.frontmatter.tags}
              slug={it.frontmatter.slug}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-base-content/70">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <p className="text-lg font-medium">게시물이 없습니다</p>
          <p className="mt-2">해당 조건에 맞는 글이 없습니다</p>
        </div>
      )}
    </div>
  );
}
