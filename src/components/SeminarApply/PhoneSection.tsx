import { SectionHeader } from '../../components/SeminarApply/SectionHeader';
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
    <div className="flex flex-col gap-12">
      <SectionHeader title="연락처를 적어주세요" required />
      <input
        value={value}
        onChange={handleChange}
        className="bg-grey-800 w-full h-14 rounded-8 placeholder:text-grey-300 px-16
                   outline-none border border-transparent focus:border-grey-300 text-grey-50"
        placeholder="ex. 010-0000-0000"
        maxLength={13} // 010-1234-5678
        inputMode="numeric"
        name="tel"
        autoComplete="tel"
      />
    </div>
  );
};
