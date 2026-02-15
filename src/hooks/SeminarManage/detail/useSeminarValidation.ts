import { useMemo } from 'react';
import type { SeminarDetailState } from '../../../types/SeminarManage/seminar.state';
import type { PendingFiles } from '../../../types/SeminarManage/seminarFile.api';

interface ValidationResult {
  dateFormatError: string | undefined;
  validateActivationDates: { application: string };
  fileErrors: {
    thumbnail: string;
    speakers: Map<number, string>;
  };
  isRequiredFieldsFilled: boolean;
  hasErrors: boolean;
  getError: () => string | null;
}

export const useSeminarValidation = (
  currentState: SeminarDetailState | null,
  pendingFiles: PendingFiles,
  mode: 'add' | 'edit'
): ValidationResult => {
  // ==================== 날짜 형식 검증 ====================
  const validateDateFormat = (date: string): string | undefined => {
    const dateRegex = /^\d{4}\.\d{1,2}\.\d{1,2}\.\d{1,2}:\d{2}$/;
    if (date && !dateRegex.test(date)) {
      return '올바른 형식(YYYY.MM.DD.HH:mm)으로 입력해주세요';
    }
    return undefined;
  };

  // ==================== 활성화 날짜 검증 ====================
  const validateActivationDates = useMemo(() => {
    if (!currentState?.applicationStartDate || !currentState.applicationEndDate) {
      return { application: '' };
    }

    const { applicationStartDate, applicationEndDate } = currentState;
    const newErrors = { application: '' };

    // 신청 기간 검증
    if (applicationStartDate > applicationEndDate) {
      newErrors.application = '※ 시작일은 종료일보다 늦을 수 없습니다.';
    } else if (applicationStartDate.getTime() === applicationEndDate.getTime()) {
      newErrors.application = '※ 시작일과 종료일은 같을 수 없습니다.';
    }

    return newErrors;
  }, [currentState]);

  // ==================== 파일 검증 ====================
  const validateFiles = useMemo(() => {
    if (!currentState) {
      return { thumbnail: '', speakers: new Map<number, string>() };
    }

    const errors = {
      thumbnail: '',
      speakers: new Map<number, string>(),
    };

    // 썸네일 검증
    if (mode === 'add' && !pendingFiles.thumbnail) {
      errors.thumbnail = '썸네일 이미지를 업로드해주세요.';
    } else if (mode === 'edit' && !currentState.thumbnailUrl && !pendingFiles.thumbnail) {
      errors.thumbnail = '썸네일 이미지를 업로드해주세요.';
    }

    // 연사 프로필 검증
    currentState.speakers.forEach((speaker, index) => {
      const key = mode === 'add' ? index : (speaker.speakerId ?? index);
      const hasExistingProfile = !!speaker.profileUrl;
      const hasPendingProfile = pendingFiles.speakerProfiles.has(key);

      // 1부 연사는 필수
      if (index === 0) {
        if (!hasExistingProfile && !hasPendingProfile) {
          errors.speakers.set(key, '1부 연사의 프로필 사진을 업로드해주세요.');
        }
      }
      // 2부 연사는 부분 입력 시 프로필 필요
      else if (index === 1) {
        const hasAnyInput =
          speaker.name.trim() ||
          speaker.organization.trim() ||
          speaker.history.trim() ||
          speaker.sessionTitle.trim() ||
          speaker.sessionContent.trim();

        if (hasAnyInput && !hasExistingProfile && !hasPendingProfile) {
          errors.speakers.set(key, '2부 연사의 프로필 사진을 업로드해주세요.');
        }
      }
    });

    return errors;
  }, [currentState, pendingFiles, mode]);

  // ==================== 필수 필드 검증 ====================
  const validateRequiredFields = useMemo(() => {
    if (!currentState) return { isValid: false, errors: [] as string[] };

    const errors: string[] = [];
    const { seminarNum, seminarDate, place, topic, speakers } = currentState;

    // 기본 필드 검증
    if (seminarNum === null) {
      errors.push('세미나 회차를 입력해주세요.');
    }
    if (!seminarDate.trim()) {
      errors.push('세미나 일정을 입력해주세요.');
    }
    if (!place.trim()) {
      errors.push('세미나 장소를 입력해주세요.');
    }
    if (!topic.trim()) {
      errors.push('세미나 주제를 입력해주세요.');
    }

    // 썸네일 검증
    const hasThumbnail =
      mode === 'add'
        ? !!pendingFiles.thumbnail
        : !!currentState.thumbnailUrl || !!pendingFiles.thumbnail;
    if (!hasThumbnail) {
      errors.push('썸네일 이미지를 업로드해주세요.');
    }

    const hasValidSpeaker = speakers.some(
      (speaker) =>
        speaker.profileUrl ||
        speaker.name.trim() ||
        speaker.organization.trim() ||
        speaker.history.trim() ||
        speaker.sessionTitle.trim() ||
        speaker.sessionContent.trim()
    );

    if (!hasValidSpeaker) {
      errors.push('최소 1명의 연사 정보를 입력해주세요.');
    } else {
      speakers.forEach((speaker, index) => {
        const key = mode === 'add' ? index : (speaker.speakerId ?? index);
        const hasProfile = !!speaker.profileUrl || !!pendingFiles.speakerProfiles.get(key);

        // 1부 연사는 필수
        if (index === 0) {
          if (!hasProfile) {
            errors.push('1부 연사의 프로필 사진을 업로드해주세요.');
          }
          if (!speaker.name.trim()) {
            errors.push('1부 연사의 이름을 입력해주세요.');
          }
          if (!speaker.organization.trim()) {
            errors.push('1부 연사의 소속을 입력해주세요.');
          }
          if (!speaker.history.trim()) {
            errors.push('1부 연사의 이력을 입력해주세요.');
          }
          if (!speaker.sessionTitle.trim()) {
            errors.push('1부 연사의 강연 제목을 입력해주세요.');
          }
          if (!speaker.sessionContent.trim()) {
            errors.push('1부 연사의 강연 내용을 입력해주세요.');
          }
        }
        // 2부 연사는 부분 입력 시 전체 필수
        else if (index === 1) {
          const hasAnyInput =
            speaker.name.trim() ||
            speaker.organization.trim() ||
            speaker.history.trim() ||
            speaker.sessionTitle.trim() ||
            speaker.sessionContent.trim() ||
            hasProfile;

          if (hasAnyInput) {
            if (!hasProfile) {
              errors.push('2부 연사의 프로필 사진을 업로드해주세요.');
            }
            if (!speaker.name.trim()) {
              errors.push('2부 연사의 이름을 입력해주세요.');
            }
            if (!speaker.organization.trim()) {
              errors.push('2부 연사의 소속을 입력해주세요.');
            }
            if (!speaker.history.trim()) {
              errors.push('2부 연사의 이력을 입력해주세요.');
            }
            if (!speaker.sessionTitle.trim()) {
              errors.push('2부 연사의 강연 제목을 입력해주세요.');
            }
            if (!speaker.sessionContent.trim()) {
              errors.push('2부 연사의 강연 내용을 입력해주세요.');
            }
          }
        }
      });
    }

    return { isValid: errors.length === 0, errors };
  }, [currentState, pendingFiles, mode]);

  // ==================== 전체 검증 결과 ====================
  const dateFormatError = currentState?.seminarDate
    ? validateDateFormat(currentState.seminarDate)
    : undefined;

  const hasErrors =
    !!dateFormatError ||
    !!validateActivationDates.application ||
    !!validateFiles.thumbnail ||
    validateFiles.speakers.size > 0 ||
    !validateRequiredFields.isValid;

  // ==================== 에러 메시지 반환 ====================
  const getError = (): string | null => {
    // 필수 필드 에러
    if (validateRequiredFields.errors.length > 0) {
      return validateRequiredFields.errors[0];
    }

    // 날짜 형식 에러
    if (dateFormatError) {
      return dateFormatError;
    }

    // 활성화 날짜 에러
    if (validateActivationDates.application) {
      return validateActivationDates.application;
    }

    // 파일 에러
    if (validateFiles.thumbnail) {
      return validateFiles.thumbnail;
    }
    if (validateFiles.speakers.size > 0) {
      const firstError = Array.from(validateFiles.speakers.values())[0];
      return firstError;
    }

    return null;
  };

  return {
    dateFormatError,
    validateActivationDates,
    fileErrors: validateFiles,
    isRequiredFieldsFilled: validateRequiredFields.isValid,
    hasErrors,
    getError,
  };
};
