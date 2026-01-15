/**
 * 블로그 카테고리 및 태그 상수 정의
 * 새로운 카테고리/태그 추가 시 이 파일을 수정하세요.
 */

export const CATEGORIES = {
  tech: "기술",
  diary: "일기",
  Memo: "메모",
  anything: "잡다한 것",
  "토이프로젝트": "토이프로젝트",
} as const;

export type Category = keyof typeof CATEGORIES;

export const CATEGORY_LIST = Object.keys(CATEGORIES) as Category[];

export const TAGS = [
  "회고",
  "프로젝트",
  "블로그",
  "markdown",
  "plugin",
  "shell",
  "git",
  "찬호",
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "CSS",
  "HTML",
] as const;

export type Tag = (typeof TAGS)[number];

/**
 * 카테고리 유효성 검사
 */
export function isValidCategory(category: string): category is Category {
  return CATEGORY_LIST.includes(category as Category);
}

/**
 * 태그 유효성 검사
 */
export function isValidTag(tag: string): tag is Tag {
  return TAGS.includes(tag as Tag);
}
