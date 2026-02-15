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
    <div className="relative w-[335px] h-[174px]">
      <textarea
        className="w-full h-full p-16 rounded-8 bg-grey-800 
        text-grey-50 placeholder:text-grey-300 whitespace-pre-wrap break-keep body-1-medium
        outline-none border border-transparent focus:border-grey-300 resize-none required"
        placeholder={placeholder}
        value={input}
        onChange={handleReviewChange}
        maxLength={80}
      />
      <span className="absolute right-[16px] bottom-[16px] text-grey-400 caption-medium">
        최대 80자(공백 포함)
      </span>
    </div>
  );
};

export default SeminarReviewInput;
