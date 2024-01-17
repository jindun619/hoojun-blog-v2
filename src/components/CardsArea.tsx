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
    <div className="mt-4 border-t-4 opacity-0 fadeInTransition">
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
  );
}
