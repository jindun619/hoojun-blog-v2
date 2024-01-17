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
      className={`btn btn-xs btn-outline rounded-full normal-case ${active}`}
      onClick={clickHandler}>{`# ${name}`}</button>
  );
}

export { TagBtn };
