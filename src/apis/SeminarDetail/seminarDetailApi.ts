import type { EmptyResultResponse } from '../../types/common';
import type {
  SeminarDetailResponse,
  UpdateSeminarRequest,
  UpdateSeminarFilesRequest,
} from '../../types/SeminarManage/seminarDetail.api';
import { adminInstance } from '../adminInstance';

// 세미나 상세 조회
export const getSeminarDetail = async (seminarId: number): Promise<SeminarDetailResponse> => {
  const res = await adminInstance.get<SeminarDetailResponse>(`/admin/seminars/${seminarId}`);
  return res.data;
};

// 세미나 삭제
export const deleteSeminar = async (seminarId: number): Promise<EmptyResultResponse> => {
  const res = await adminInstance.delete<EmptyResultResponse>(`/admin/seminars/${seminarId}`);
  return res.data;
};

// 세미나 기본 정보 수정
export const putSeminar = async (
  seminarId: number,
  payload: UpdateSeminarRequest
): Promise<EmptyResultResponse> => {
  const res = await adminInstance.put<EmptyResultResponse>(`/admin/seminars/${seminarId}`, payload);
  return res.data;
};

// 세미나 파일 수정
export const patchSeminarFiles = async (
  seminarId: number,
  params: UpdateSeminarFilesRequest
): Promise<EmptyResultResponse> => {
  const { deleteMaterialUrls, speakerIds, thumbnailFile, materials, speakerProfiles } = params;

  // FormData 생성
  const formData = new FormData();

  // deleteMaterialUrls 추가
  if (deleteMaterialUrls.length > 0) {
    deleteMaterialUrls.forEach((url) => {
      formData.append('deleteMaterialUrls', url);
    });
  }

  // speakerIds 추가
  if (speakerIds.length > 0) {
    speakerIds.forEach((id) => {
      formData.append('speakerIds', id.toString());
    });
  }

  // thumbnailFile 추가
  if (thumbnailFile) {
    formData.append('thumbnailFile', thumbnailFile);
  }

  // materials 추가
  if (materials && materials.length > 0) {
    materials.forEach((file) => {
      formData.append('materials', file);
    });
  }

  // speakerProfiles 추가
  if (speakerProfiles && speakerProfiles.length > 0) {
    speakerProfiles.forEach((file) => {
      formData.append('speakerProfiles', file);
    });
  }

  const res = await adminInstance.patch<EmptyResultResponse>(
    `/admin/seminars/${seminarId}/files`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return res.data;
};
