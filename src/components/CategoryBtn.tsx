interface CategoryBtnProps {
  name: string;
  isActive: boolean;
  isOutlined?: boolean;
}
export function CategoryBtn({ name, isActive, isOutlined }: CategoryBtnProps) {
  var active, outline;
  if (isActive) {
    active = "btn-actives";
  }
  if (isOutlined) {
    outline = "btn-outline";
  }

  return (
    <button
      className={`btn btn-sm btn-primary hover:bg-primary normal-case ${active} ${outline}`}>
      {name}
    </button>
  );
}
