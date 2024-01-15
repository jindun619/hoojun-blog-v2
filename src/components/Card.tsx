import { useState, useEffect } from "react";

import { TagBtn } from "./TagBtn";
import Link from "next/link";

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

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const showTags = tags.map((tagName) => (
    <Link key={tagName} href={`/tag=${tagName}`}>
      <TagBtn name={tagName} />
    </Link>
  ));

  if (isMounted) {
    return (
      <div className="card-normal font-sans cursor-pointer hover:bg-primary-content border-b">
        <Link href={`/post${slug}`} className="no-underline">
          <div className="p-4 text-base">
            <h2 className="card-titles text-3xl font-bold text-primary">{`[${category}]${title}`}</h2>
            <p className="text-base text-base-content font-semibold my-2">
              {content}
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
