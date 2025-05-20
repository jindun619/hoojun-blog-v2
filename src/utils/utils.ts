import { remark } from "remark";
import html from "remark-html";

export async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

export function htmlToText(html: string) {
  return html.replace(/<[^>]+>/g, "");
}
