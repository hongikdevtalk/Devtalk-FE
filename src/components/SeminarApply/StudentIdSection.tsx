import { useState } from 'react';
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
    <div className="flex flex-col mt-[30px]">
      <p className="subhead-medium text-black">학번</p>
      <div className="flex items-center gap-[12px] mt-[12px]">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="C00000"
          name="student-id"
          autoComplete="off"
          className={`h-[56px] w-[278px] px-[20px] rounded-[3px] text-grey-700 border-[1.4px] outline-none bg-transparent
            ${error ? 'border-status-error' : 'border-grey-700'}`}
        />
        <button
          type="button"
          className="flex h-[56px] px-[20px] items-center rounded-[3px] bg-grey-900 whitespace-nowrap shrink-0"
        >
          <span className="heading-3-semibold-normal text-white">중복확인</span>
        </button>
      </div>
      {error && <p className="mt-[4px] text-status-error body-2-medium">{error}</p>}
    </div>
  );
};
