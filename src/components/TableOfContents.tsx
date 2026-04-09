import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

interface TableOfContentsProps {
  contentRef: React.RefObject<HTMLDivElement>;
  html: string;
}

export function TableOfContents({ contentRef, html }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    if (!contentRef.current) return;
    const headings = contentRef.current.querySelectorAll("h2, h3");
    const items: TocItem[] = [];
    headings.forEach((el) => {
      const id = el.getAttribute("id");
      if (!id) return;
      const clone = el.cloneNode(true) as HTMLElement;
      clone.querySelectorAll("a").forEach((a) => a.remove());
      const text = clone.textContent?.trim() || "";
      if (text) items.push({ id, text, level: el.tagName === "H2" ? 2 : 3 });
    });
    setTocItems(items);
  }, [html]);

  useEffect(() => {
    if (!tocItems.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (intersecting.length > 0) {
          setActiveId(intersecting[0].target.getAttribute("id") || "");
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );
    tocItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [tocItems]);

  if (!tocItems.length) return null;

  return (
    <aside className="toc-sidebar" aria-label="목차">
      <p>목차</p>
      <nav>
        {tocItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`toc-item toc-h${item.level}${activeId === item.id ? " toc-active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {item.text}
          </a>
        ))}
      </nav>
    </aside>
  );
}
