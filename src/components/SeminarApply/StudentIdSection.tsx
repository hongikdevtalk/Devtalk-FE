import { useState } from 'react';
import { SectionHeader } from '../../components/SeminarApply/SectionHeader';
import { formatStudentId, validateStudentId } from '../../utils/formatStudentId';

type StudentIdSectionProps = {
  value: string;
  onChange: (value: string) => void;
};

export const StudentIdSection = ({ value, onChange }: StudentIdSectionProps) => {
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatStudentId(e.target.value);
    onChange(formatted);

    if (formatted && !validateStudentId(formatted)) {
      setError('학번은 알파벳 1자리 + 숫자 6자리여야 합니다.');
    } else {
      setError('');
    }
  };

  return (
    <div className="flex flex-col gap-12">
      <SectionHeader title="학번을 적어주세요" required />
      <div className="relative">
        <input
          value={value}
          onChange={handleChange}
          placeholder="ex. C012345"
          className={`bg-grey-800 w-full h-14 rounded-8 placeholder:text-grey-300 px-16
                      outline-none border text-grey-50
                      ${error ? 'border-status-error focus:border-status-error' : 'border-transparent focus:border-grey-300'}`}
          name="student-id"
          autoComplete="off"
        />
        {error && (
          <p className="absolute left-0 top-full mt-1 text-status-error body-2-medium">{error}</p>
        )}
      </div>
    </div>
  );
};
