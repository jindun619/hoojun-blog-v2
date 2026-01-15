import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { isValidCategory, CATEGORY_LIST } from "./constants";
import type { PostProps, Frontmatter } from "../types/types";

const postsDirectory = path.join(process.cwd(), "posts");

/**
 * Frontmatter 유효성 검사
 */
function validateFrontmatter(
  id: string,
  frontmatter: Record<string, unknown>
): string[] {
  const warnings: string[] = [];

  // 필수 필드 검사
  if (!frontmatter.slug) {
    warnings.push(`[${id}.md] 필수 필드 누락: slug`);
  }
  if (!frontmatter.date) {
    warnings.push(`[${id}.md] 필수 필드 누락: date`);
  }
  if (!frontmatter.title) {
    warnings.push(`[${id}.md] 필수 필드 누락: title`);
  }
  if (!frontmatter.category) {
    warnings.push(`[${id}.md] 필수 필드 누락: category`);
  }

  // 카테고리 유효성 검사
  if (
    frontmatter.category &&
    !isValidCategory(frontmatter.category as string)
  ) {
    warnings.push(
      `[${id}.md] 잘못된 카테고리: "${frontmatter.category}" (사용 가능: ${CATEGORY_LIST.join(", ")})`
    );
  }

  // 날짜 형식 검사 (YYYY-MM-DD)
  if (frontmatter.date) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(frontmatter.date as string)) {
      warnings.push(
        `[${id}.md] 잘못된 날짜 형식: "${frontmatter.date}" (올바른 형식: YYYY-MM-DD)`
      );
    }
  }

  return warnings;
}

export function getSortedPostsData(): PostProps[] {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allWarnings: string[] = [];
  const slugSet = new Set<string>();

  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      // Remove ".md" from file name to get id
      const id = fileName.replace(/\.md$/, "");

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);
      const frontmatter = matterResult.data as Frontmatter;

      // 유효성 검사
      const warnings = validateFrontmatter(id, matterResult.data);
      allWarnings.push(...warnings);

      // slug 중복 검사
      if (frontmatter.slug) {
        if (slugSet.has(frontmatter.slug)) {
          allWarnings.push(`[${id}.md] slug 중복: "${frontmatter.slug}"`);
        }
        slugSet.add(frontmatter.slug);
      }

      // Combine the data with the id
      return {
        id,
        frontmatter,
        content: matterResult.content,
      };
    });

  // 경고 출력 (빌드 시 콘솔에 표시)
  if (allWarnings.length > 0) {
    console.warn("\n⚠️  포스트 유효성 검사 경고:");
    allWarnings.forEach((w) => console.warn(`   ${w}`));
    console.warn("");
  }

  // Sort posts by date
  const sortedAllPostsData = allPostsData.sort((a, b) => {
    if (a.frontmatter.date < b.frontmatter.date) {
      return 1;
    } else {
      return -1;
    }
  });

  //don't include posts with frontmatter.hide == true
  return sortedAllPostsData.filter((post) => {
    return !post.frontmatter.hide;
  });
}
