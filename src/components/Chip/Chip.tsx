interface ChipProps {
  text: string;
  className?: string;
}

export const Chip = ({ text, className = '' }: ChipProps) => {
  return (
    <button
      className={`inline-flex w-fit py-[6px] px-[10px] justify-center items-center gap-[10px] rounded-[5px] bg-grey-400 ${className}`}
    >
      <p className="body-medium text-grey-700">{text}</p>
    </button>
  );
};
