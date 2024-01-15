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
      {data.map((node) => (
        <Card
          key={node.frontmatter.title}
          category={node.frontmatter.category}
          title={node.frontmatter.title}
          content={node.content} //excerpt
          date={node.frontmatter.date}
          tags={node.frontmatter.tags}
          slug={node.frontmatter.slug}
        />
      ))}
    </div>
  );
}
