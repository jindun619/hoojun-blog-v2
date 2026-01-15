import type { Category, Tag } from "../lib/constants";

export interface Frontmatter {
  slug: string;
  date: string;
  title: string;
  category: Category;
  tags: string[];
  references: string[];
  hide?: boolean;
  coverImage?: string;
  lastmod?: string;
}

export interface PostProps {
  id: string;
  content: string;
  frontmatter: Frontmatter;
}
