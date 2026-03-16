import { formatPhoneNumber } from '../../utils/formatPhoneNumber';

type PhoneSectionProps = {
  value: string;
  onChange: (value: string) => void;
};

export const PhoneSection = ({ value, onChange }: PhoneSectionProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(formatPhoneNumber(e.target.value));
  };

  return (
    <div className="flex flex-col mt-[30px]">
      <p className="subhead-medium text-black">전화번호</p>
      <input
        type="tel"
        value={value}
        onChange={handleChange}
        placeholder="010-0000-0000"
        maxLength={13}
        inputMode="numeric"
        name="tel"
        autoComplete="tel"
        className="heading-3-regular-normal text-grey-700 h-[56px] px-[20px] self-stretch rounded-[3px] border-[1.4px] border-grey-700 mt-[12px] outline-none bg-transparent"
      />
    </div>
  );
};
