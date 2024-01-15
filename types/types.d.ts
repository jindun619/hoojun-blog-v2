export interface PostProps {
  id: string;
  content: string;
  frontmatter: {
    [key: string]: any;
  };
}
