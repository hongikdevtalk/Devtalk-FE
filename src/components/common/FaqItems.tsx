interface FaqItemProps {
  question: string;
  answer: string;
  highlightText?: string;
}

const FaqItems = ({ question, answer, highlightText }: FaqItemProps) => {
  const renderAnswer = () => {
    if (!highlightText || !answer.includes(highlightText)) {
      return answer;
    }

    const parts = answer.split(new RegExp(`(${highlightText})`, 'g'));

    return parts.map((part, index) =>
      part === highlightText ? (
        <span key={index} className="font-semibold text-grey-700">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="w-full flex flex-col gap-[10px] px-5 pt-2.5 pb-[26px]">
      {/* 질문(Q)*/}
      <div
        className="self-stretch p-[3px] rounded-[30px] flex justify-start items-center gap-[10px]"
        style={{
          background:
            'radial-gradient(ellipse 228.09% 738.94% at 71.00% 247.83%, #ADE657 0%, #4EABB5 100%)',
        }}
      >
        <div className="w-10 h-10 bg-[#F8F8F8] rounded-[20px] flex justify-center items-center shrink-0 shadow-sm">
          <span className="text-[#6ABC9A] text-[20px] font-bold font-['Pretendard']">Q</span>
        </div>
        <div className="text-white text-[16px] font-semibold font-['Pretendard'] leading-5">
          {question}
        </div>
      </div>

      {/* 답변(A) */}
      <div className="self-stretch py-[3px] pl-[3px] pr-5 flex justify-start items-start gap-[10px]">
        <div className="w-10 h-10 rounded-[20px] border border-[#7B7E84] flex justify-center items-center shrink-0">
          <span className="text-grey-700 text-[20px] font-bold font-['Pretendard']">A</span>
        </div>
        <div className="flex-1 text-grey-700 text-[16px] font-normal font-['Pretendard'] leading-5 break-keep pt-2">
          {renderAnswer()}
        </div>
      </div>
    </div>
  );
};

export default FaqItems;
