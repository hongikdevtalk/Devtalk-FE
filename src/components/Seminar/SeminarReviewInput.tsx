interface SeminarReviewInputProps {
  placeholder: string;
  input: string;
  onChange: (value: string) => void;
}

const SeminarReviewInput = ({ placeholder, input, onChange }: SeminarReviewInputProps) => {
  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative w-full h-full rounded-8">
      <textarea
        className="w-full h-full p-16 rounded-8 border-[1px]
        text-black placeholder:text-grey-700 whitespace-pre-wrap break-keep body-1-medium
        outline-none border-black focus:border-black resize-none required"
        placeholder={placeholder}
        value={input}
        onChange={handleReviewChange}
        maxLength={100}
      />
      <span className="absolute right-[16px] bottom-[16px] text-grey-700 caption-medium">
        최대 100자(공백 포함)
      </span>
    </div>
  );
};

export default SeminarReviewInput;
