interface ChipProps {
  text: string;
  className?: string;
}

export const Chip = ({ text, className = '' }: ChipProps) => {
  return (
    <button
      className={`
        inline-flex items-center gap-[8px]
        px-[12px] py-[8px]
        bg-grey-800 rounded-8
        w-fit
        ${className}
      `}
    >
      <p className="text-gradient">{text}</p>
    </button>
  );
};
