type SessionQuestionCardProps = {
  index: number;
  title: string;
  oneLineSummary?: string | null;
  value: string;
  onChange: (value: string) => void;
};

export const SessionQuestionCard = ({ index, title, oneLineSummary, value, onChange }: SessionQuestionCardProps) => (
  <div className="flex flex-col">
    <div className="flex items-center gap-[12px]">
      <span className="subhead-medium text-black whitespace-nowrap">{index}부</span>
      <span className="subhead-light text-black">{title}</span>
    </div>
    {oneLineSummary && <span className="body-1-light text-grey-700 mt-[4px]">{oneLineSummary}</span>}
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={`${index}부 연사님께 궁금한 점을 입력해 주세요.`}
      className={`subhead-1-regular placeholder:text-grey-700 mt-[12px] h-[321px] self-stretch rounded-[3px] border-[1.4px] px-[20px] py-[16px] resize-none outline-none bg-transparent ${value ? 'text-black border-black' : 'text-grey-700 border-grey-700'}`}
    />
  </div>
);
