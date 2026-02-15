import { useState } from 'react';
import {
  validateAdminId,
  validateAdminPassword,
  type ValidationResult,
} from '../../../utils/adminValidators';

interface AddAdminFormProps {
  onSubmit: (data: { name: string; userId: string; password: string }) => void;
  isLoading?: boolean;
}

const AddAdminForm: React.FC<AddAdminFormProps> = ({ onSubmit, isLoading = false }) => {
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  // 유효성 검증 결과 상태
  const [userIdValidation, setUserIdValidation] = useState<ValidationResult>({ isValid: true });
  const [passwordValidation, setPasswordValidation] = useState<ValidationResult>({ isValid: true });
  const [koreanInputError, setKoreanInputError] = useState(false);

  // 한글 입력 방지 및 에러 메시지 표시
  const handleKoreanInput = (value: string) => {
    const hasKorean = /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(value);
    // 한글이 있으면 에러 메시지 표시, 없으면 바로 숨김
    setKoreanInputError(hasKorean);
    return hasKorean ? value.replace(/[ㄱ-ㅎㅏ-ㅣ가-힣]/g, '') : value;
  };

  // 입력값 변경 핸들러
  const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = handleKoreanInput(e.target.value);
    setUserId(value);
    setUserIdValidation(validateAdminId(value));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = handleKoreanInput(e.target.value);
    setPassword(value);
    setPasswordValidation(validateAdminPassword(value));
  };

  const isFormValid =
    name.trim() &&
    userId.trim() &&
    password.trim() &&
    userIdValidation.isValid &&
    passwordValidation.isValid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      onSubmit({ name, userId, password });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="text-white flex flex-col gap-10 max-w-[490px] w-full mx-auto"
    >
      {/* 이름 */}
      <div>
        <label className="heading-2-semibold block mb-8">이름</label>
        <input
          type="text"
          placeholder="이름을 입력하세요."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-8 bg-grey-700 py-20 px-24 placeholder-grey-400 subhead-1-medium text-grey-50 outline-none focus:ring-1 focus:ring-grey-300"
        />
      </div>

      {/* 계정 */}
      <div>
        <label className="heading-2-semibold block mb-8">계정</label>
        <div className="mb-12">
          <input
            type="text"
            placeholder="아이디를 입력하세요."
            value={userId}
            onChange={handleUserIdChange}
            pattern="[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':\\|,.<>/?]+"
            className={`w-full rounded-8 bg-grey-700 py-20 px-24 placeholder-grey-400 subhead-1-medium text-grey-50 outline-none focus:ring-1 focus:ring-grey-300 ${
              !userIdValidation.isValid && userId ? 'ring-1 ring-status-error' : ''
            }`}
          />
          {!userIdValidation.isValid && userId && (
            <p className="mt-8 text-status-error body-2-medium">{userIdValidation.error}</p>
          )}
          {koreanInputError && (
            <p className="mt-8 text-status-error body-2-medium">
              한글은 입력할 수 없습니다. 영문, 숫자, 특수문자만 사용 가능합니다.
            </p>
          )}
        </div>
        <div>
          <input
            type="password"
            placeholder="비밀번호를 입력하세요."
            value={password}
            onChange={handlePasswordChange}
            pattern="[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':\\|,.<>/?]+"
            className={`w-full rounded-8 bg-grey-700 py-20 px-24 placeholder-grey-400 subhead-1-medium text-grey-50 outline-none focus:ring-1 focus:ring-grey-300 ${
              !passwordValidation.isValid && password ? 'ring-1 ring-status-error' : ''
            }`}
          />
          {!passwordValidation.isValid && password && (
            <p className="mt-8 text-status-error body-2-medium">{passwordValidation.error}</p>
          )}
        </div>
      </div>

      {/* 버튼 */}
      <button
        type="submit"
        disabled={!isFormValid || isLoading}
        className={`w-full mt-48 py-[18px] rounded-8 heading-3-semibold transition-all duration-300
          ${
            isFormValid && !isLoading
              ? 'text-black cursor-pointer bg-green-300 hover:[background-image:var(--gradient-graphic)]'
              : 'bg-grey-200 text-grey-700 cursor-not-allowed opacity-60'
          }`}
      >
        {isLoading ? '추가 중...' : '관리자 아이디 추가하기'}
      </button>
    </form>
  );
};

export default AddAdminForm;
