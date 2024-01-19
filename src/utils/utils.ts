import { remark } from "remark";
import html from "remark-html";

export const verifyToken = (token: string) => {
  // 토큰 검증 로직 구현
  return token === process.env.ADMIN_TOKEN;
};

export async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

export function htmlToText(html: string) {
  return html.replace(/<[^>]+>/g, "");
}
