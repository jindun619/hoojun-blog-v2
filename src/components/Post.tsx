import { useState, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";

import { CategoryBtn } from "./CategoryBtn";
import { TagBtn } from "./TagBtn";
import { Bio } from "./Bio";

interface PostProps {
  slug: string;
  title: string;
  category: string;
  tags: string[];
  date: string;
  references: string[];
  html: string;
}
export function Post({
  slug,
  title,
  category,
  tags,
  date,
  references,
  html,
}: PostProps) {
  const [imgValid, setImgValid] = useState<boolean>(true);

  const featuredImageUrl = `/post_images${slug}/fi.png`;

  const showTags = tags.map((it: string, idx: number) => (
    <TagBtn key={idx} name={it} href={`/tag/${it}`} />
  ));

  const showReferences = references.map((node: string) => (
    <div key={node}>
      <Link href={node} className="text-primary hover:decoration-double">
        {node}
      </Link>
    </div>
  ));

  useEffect(() => {
    // FADE IN TRANSITION
    const fadeInTransition = document.querySelector(".fadeInTransition");
    if (fadeInTransition) {
      fadeInTransition.classList.remove("opacity-0");
    }
  });

  return (
    <div className="max-w-2xl mx-auto pt-16 px-4 md:px-0 opacity-0 fadeInTransition">
      <div className="mb-2">
        <Link href={`/category/${category}`}>
          <CategoryBtn name={category} isActive={true} />
        </Link>
      </div>
      <article className="prose max-w-none">
        <header>
          <h1>{title || ""}</h1>
          <p>{date}</p>
          <div>{showTags}</div>
        </header>
        {/* Featured Image */}
        {imgValid ? (
          <div className="relative h-80 mb-10">
            <Image
              src={featuredImageUrl}
              alt="featuredImage"
              fill={true}
              style={{ borderRadius: "20px", objectFit: "cover" }}
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
        <div className={references.length !== 0 ? "border-b-2 pb-8" : ""}>
          <h2>{references.length !== 0 ? "참고" : ""}</h2>
          {showReferences}
        </div>
      </article>
      <div className="pt-8 pb-16">
        <Bio />
      </div>
    </div>
  );
}
