interface TagProps {
  children: React.ReactNode;
  className?: string;
}

const Tag = ({ children, className = '' }: TagProps) => {
  return (
    <div
      className={`px-[10px] py-[6px] bg-grey-400 rounded-[5px] flex justify-center items-center shrink-0 ${className}`}
    >
      <span className="text-grey-700 body-1-medium leading-none">{children}</span>
    </div>
  );
};

export default Tag;
