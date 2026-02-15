const ADMIN_ID_PASSWORD_PATTERN = /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/;
const MIN_LENGTH = 8;
const MAX_LENGTH = 16;

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/* 관리자 아이디 유효성 검증 */
export function validateAdminId(id: string): ValidationResult {
  if (!id) {
    return { isValid: false, error: '아이디를 입력해주세요.' };
  }

  if (id.length < MIN_LENGTH || id.length > MAX_LENGTH) {
    return { isValid: false, error: '아이디는 8~16자 사이여야 합니다.' };
  }

  if (id.includes(' ')) {
    return { isValid: false, error: '아이디에 공백을 포함할 수 없습니다.' };
  }

  if (!ADMIN_ID_PASSWORD_PATTERN.test(id)) {
    return { isValid: false, error: '영문, 숫자, 특수문자만 사용 가능합니다.' };
  }

  return { isValid: true };
}

/**
 * 관리자 비밀번호 유효성 검증
 */
export function validateAdminPassword(password: string): ValidationResult {
  if (!password) {
    return { isValid: false, error: '비밀번호를 입력해주세요.' };
  }

  if (password.length < MIN_LENGTH || password.length > MAX_LENGTH) {
    return { isValid: false, error: '비밀번호는 8~16자 사이여야 합니다.' };
  }

  if (password.includes(' ')) {
    return { isValid: false, error: '비밀번호에 공백을 포함할 수 없습니다.' };
  }

  if (!ADMIN_ID_PASSWORD_PATTERN.test(password)) {
    return { isValid: false, error: '영문, 숫자, 특수문자만 사용 가능합니다.' };
  }

  return { isValid: true };
}
