import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeKatex from "rehype-katex";
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(remarkGfm)
    .use(remarkMath) // LaTeX 수식 파싱
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeKatex) // KaTeX로 수식 렌더링
    .use(rehypeSlug) // 헤더에 id 추가
    .use(rehypeAutolinkHeadings) // 헤더에 링크 추가
    .use(rehypeStringify, { allowDangerousHtml: true }) // HTML로 변환
    .process(markdown);
  return result.toString();
}

export function htmlToText(html: string) {
  return html.replace(/<[^>]+>/g, "");
}
