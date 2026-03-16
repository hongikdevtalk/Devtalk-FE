type NameSectionProps = {
  value: string;
  onChange: (value: string) => void;
};

export const NameSection = ({ value, onChange }: NameSectionProps) => (
  <div className="flex flex-col mt-[30px]">
    <p className="subhead-medium text-black">이름</p>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="이름을 입력해주세요."
      name="name"
      autoComplete="name"
      className="heading-3-regular-normal text-grey-700 h-[56px] px-[20px] self-stretch rounded-[3px] border-[1.4px] border-grey-700 mt-[12px] outline-none bg-transparent"
    />
  </div>
);
