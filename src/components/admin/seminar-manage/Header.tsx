interface HeaderProps {
  title: string;
  showDeleteButton: boolean;
  onDelete?: () => void;
}

const Header = ({ title, showDeleteButton, onDelete }: HeaderProps) => (
  <header className="sticky top-0 z-20 mb-20 py-20 bg-background/90 flex justify-between items-center min-w-[850px] max-w-[1060px]">
    <h1 className="heading-1-bold text-white">{title}</h1>
    {showDeleteButton && (
      <button
        className="heading-3-semibold text-status-error hover:text-status-error/80 cursor-pointer"
        onClick={onDelete}
      >
        세미나 삭제하기
      </button>
    )}
  </header>
);

export default Header;
