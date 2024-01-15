interface TagBtnProps {
  name: string;
  isActive?: boolean;
}
function TagBtn({ name, isActive }: TagBtnProps) {
  var active;
  if (isActive) {
    active = "btn-active";
  }
  return (
    <button
      className={`btn btn-xs btn-outline rounded-full normal-case ${active}`}>{`# ${name}`}</button>
  );
}

export { TagBtn };
