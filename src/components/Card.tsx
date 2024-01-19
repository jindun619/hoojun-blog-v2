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
      <div className="card-normal font-sans cursor-pointer hover:bg-primary-content border-b">
        <Link href={`/post${slug}`} className="no-underline">
          <div className="p-4 text-base">
            <h2 className="card-titles text-3xl font-bold text-primary">{`[${category}]${title}`}</h2>
            <p className="text-base text-base-content font-semibold my-2">
              {htmlToText(convertedContent).substring(0, 200) + ".."}
            </p>
            <div className="flex flex-wrap gap-2">{showTags}</div>
            <p className="text-sm text-neutral-content font-semibold mt-2">
              {date}
            </p>
          </div>
        </Link>
      </div>
    );
  }
}
