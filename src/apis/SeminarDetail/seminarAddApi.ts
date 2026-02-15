import type { EmptyResultResponse } from '../../types/common';
import type { AddSeminarRequest } from '../../types/SeminarManage/seminarAdd.api';
import type { PendingFiles } from '../../types/SeminarManage/seminarFile.api';
import { adminInstance } from '../adminInstance';

// 세미나 추가하기
export const postSeminar = async (
  seminarData: AddSeminarRequest,
  fileData: PendingFiles
): Promise<EmptyResultResponse> => {
  const formData = new FormData();

  // SeminarRequest 추가
  formData.append(
    'seminarRequest',
    new Blob([JSON.stringify(seminarData)], { type: 'application/json' })
  );

  // thumbnailFile 추가
  if (fileData.thumbnail) {
    formData.append('thumbnailFile', fileData.thumbnail);
  }

  // materials 추가
  fileData.materials.forEach((file) => {
    formData.append('materials', file);
  });

  // speakersProfile 추가
  const speakerProfileFiles: File[] = [];
  seminarData.speakers.forEach((_, index) => {
    const file = fileData.speakerProfiles.get(index);
    if (file) {
      speakerProfileFiles.push(file);
    }
  });

  // 연사진 프로필 사진 추가
  speakerProfileFiles.forEach((file) => {
    formData.append('speakerProfiles', file);
  });

  const res = await adminInstance.post<EmptyResultResponse>(`/admin/seminars`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};
