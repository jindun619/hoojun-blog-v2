import { useState, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";

import Prism from "prismjs";
import "prismjs/components/prism-typescript.min";
import "prismjs/components/prism-python.min";
import "prismjs/components/prism-bash.min";
import "prismjs/themes/prism-tomorrow.css";

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
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

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
    Prism.highlightAll();
  }, [html]);

  useEffect(() => {
    // FADE IN TRANSITION
    const fadeInTransition = document.querySelector(".fadeInTransition");
    if (fadeInTransition) {
      fadeInTransition.classList.remove("opacity-0");
    }
  });

  return (
    <div className="w-full mx-auto opacity-0 fadeInTransition">
      <div className="mb-6 flex items-center gap-3">
        <Link href="/" className="text-base-content/60 hover:text-primary transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <Link href={`/category/${category}`}>
          <CategoryBtn name={category} isActive={true} />
        </Link>
      </div>
      
      <article className="prose max-w-none">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold !mb-4">{title || ""}</h1>
          <p className="text-base-content/70 !my-2">{date}</p>
          <div className="flex flex-wrap gap-2">{showTags}</div>
        </header>
        
        {imgValid ? (
          <div className="relative h-[300px] md:h-[400px] mb-10 rounded-xl overflow-hidden shadow-md">
            <Image
              src={featuredImageUrl}
              alt={title || "Featured Image"}
              fill={true}
              style={{ objectFit: "cover" }}
              className={`transition-transform hover:scale-105 duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onError={() => {
                setImgValid(false);
              }}
              onLoad={() => {
                setImageLoaded(true);
              }}
              priority
              unoptimized
            />
          </div>
        ) : (
          ""
        )}
        
        <div
          dangerouslySetInnerHTML={{ __html: html }}
          className="mdSyntax pb-10 border-b border-base-300"
        />
        
        {references.length > 0 && (
          <div className="border-b border-base-300 pb-10 mt-10">
            <h2 className="text-2xl font-bold mb-4">참고 자료</h2>
            <div className="flex flex-col gap-2">
              {showReferences}
            </div>
          </div>
        )}
      </article>
      
      <div className="py-10 border-t border-base-200 mt-10">
        <Bio />
      </div>
    </div>
  );
}
