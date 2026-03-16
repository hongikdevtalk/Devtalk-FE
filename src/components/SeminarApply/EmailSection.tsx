type EmailSectionProps = {
  value: string;
  onChange: (value: string) => void;
};

export const EmailSection = ({ value, onChange }: EmailSectionProps) => (
  <div className="flex flex-col mt-[30px]">
    <p className="subhead-medium text-black">이메일</p>
    <input
      type="email"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="devtalk@g.hongik.ac.kr"
      name="email"
      autoComplete="email"
      className="heading-3-regular-normal text-grey-700 h-[56px] px-[20px] self-stretch rounded-[3px] border-[1.4px] border-grey-700 mt-[12px] outline-none bg-transparent"
    />
  </div>
);
