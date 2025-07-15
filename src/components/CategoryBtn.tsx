interface CategoryBtnProps {
  name: string;
  isActive?: boolean;
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
      className={`px-4 py-1.5 text-sm font-medium bg-primary/10 hover:bg-primary/20 text-primary hover:text-primary-focus rounded-md transition-all duration-200 ${active ? 'bg-primary/20 font-semibold' : ''} ${outline ? 'border border-primary/30' : ''}`}>
      {name}
    </button>
  );
}
