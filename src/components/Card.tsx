import { useState, useEffect } from "react";

import { TagBtn } from "./TagBtn";
import Link from "next/link";

import { markdownToHtml, htmlToText } from "@/utils/utils";

interface CardProps {
  title: string;
  content: string;
  date: string;
  slug: string;
  category: string;
  tags: string[];
}
export function Card({
  title,
  content,
  date,
  slug,
  category,
  tags,
}: CardProps) {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [convertedContent, setConvertedContent] = useState<string>("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    (async () => {
      const convertedHtml = await markdownToHtml(content);
      setConvertedContent(convertedHtml);
    })();
  }, [content]);

  const showTags = tags.map((tagName, idx) => {
    if (tagName) {
      return <TagBtn key={idx} name={tagName} href={`/tag/${tagName}`} />;
    }
  });

  if (isMounted) {
    return (
      <div className="card bg-base-100 hover:bg-base-200 transition-all duration-300 rounded-lg shadow-sm hover:shadow-md overflow-hidden mb-6">
        <Link href={`/post${slug}`} className="no-underline">
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="badge badge-primary">{category}</span>
              <time className="text-sm font-medium text-base-content/70 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {date}
              </time>
            </div>
            <h2 className="text-2xl font-bold text-base-content mb-3 hover:text-primary transition-colors">{title}</h2>
            <p className="text-base text-base-content/80 mb-4 line-clamp-3">
              {htmlToText(convertedContent).substring(0, 160) + "..."}
            </p>
            <div className="flex flex-wrap gap-2 mt-auto">{showTags}</div>
          </div>
        </Link>
      </div>
    );
  }
}
