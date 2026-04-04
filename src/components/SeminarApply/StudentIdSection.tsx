import { useState } from 'react';
import { formatStudentId, validateStudentId } from '../../utils/formatStudentId';
import { getDuplicateCheck } from '../../apis/seminarApply';

type StudentIdSectionProps = {
  value: string;
  onChange: (value: string) => void;
  onDuplicateCheck?: (passed: boolean) => void;
};

export const StudentIdSection = ({ value, onChange, onDuplicateCheck }: StudentIdSectionProps) => {
  const [error, setError] = useState('');
  const [duplicateMsg, setDuplicateMsg] = useState('');
  const [duplicateError, setDuplicateError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatStudentId(e.target.value);
    onChange(formatted);
    setDuplicateMsg('');
    setDuplicateError(false);
    onDuplicateCheck?.(false);

    if (formatted && !validateStudentId(formatted)) {
      setError('학번은 알파벳 1자리 + 숫자 6자리여야 합니다.');
    } else {
      setError('');
    }
  };

  const handleDuplicateCheck = async () => {
    if (!validateStudentId(value)) return;
    try {
      const res = await getDuplicateCheck(value);
      setDuplicateError(!res.isSuccess);
      setDuplicateMsg(res.isSuccess ? '신청 가능한 학번입니다.' : (res.message ?? '이미 신청된 학번입니다.'));
      onDuplicateCheck?.(res.isSuccess);
    } catch {
      setDuplicateError(true);
      setDuplicateMsg('중복 확인에 실패했습니다.');
      onDuplicateCheck?.(false);
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
          className={`h-[56px] flex-1 min-w-0 px-[20px] rounded-[3px] text-grey-700 border-[1.4px] outline-none bg-transparent
            ${error ? 'border-status-error' : 'border-grey-700'}`}
        />
        <button
          type="button"
          onClick={handleDuplicateCheck}
          disabled={!validateStudentId(value)}
          className="flex h-[56px] px-[20px] items-center rounded-[3px] bg-grey-900 whitespace-nowrap shrink-0 disabled:opacity-40"
        >
          <span className="heading-3-semibold-normal text-white">중복확인</span>
        </button>
      </div>
      {error && <p className="mt-[4px] text-status-error body-2-medium">{error}</p>}
      {!error && duplicateMsg && (
        <p className={`mt-[4px] body-2-medium ${duplicateError ? 'text-status-error' : 'text-grey-700'}`}>
          {duplicateMsg}
        </p>
      )}
    </div>
  );
};
