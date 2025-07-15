import { useRouter } from "next/router";

interface TagBtnProps {
  name: string;
  href: string;
  isActive?: boolean;
}
function TagBtn({ name, href, isActive }: TagBtnProps) {
  const router = useRouter();
  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(href);
  };
  var active;
  if (isActive) {
    active = "btn-active";
  }

  return (
    <button
      className={`px-3 py-1 text-xs font-medium bg-base-200 hover:bg-base-300 text-secondary hover:text-secondary-focus rounded-full transition-all duration-200 ${active ? 'bg-secondary/10 text-secondary' : ''}`}
      onClick={clickHandler}>{`# ${name}`}</button>
  );
}

export { TagBtn };
