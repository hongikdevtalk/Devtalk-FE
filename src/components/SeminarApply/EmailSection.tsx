import { SectionHeader } from '../../components/SeminarApply/SectionHeader';

type EmailSectionProps = {
  value: string;
  onChange: (value: string) => void;
};

export const EmailSection = ({ value, onChange }: EmailSectionProps) => (
  <div className="flex flex-col gap-12">
    <SectionHeader title="이메일을 적어주세요" required />
    <input
      type="email"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-grey-800 w-full h-14 rounded-8 placeholder:text-grey-300 px-16
                 outline-none border border-transparent focus:border-grey-300 text-grey-50"
      placeholder="ex. aaaa@g.hongik.ac.kr"
      name="email"
      autoComplete="email"
    />
  </div>
);
