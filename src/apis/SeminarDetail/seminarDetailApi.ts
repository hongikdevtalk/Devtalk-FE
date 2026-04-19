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

  // deleteMaterialUrls, speakerIds는 query param으로 전송
  const queryParams = new URLSearchParams();
  deleteMaterialUrls.forEach((url) => queryParams.append('deleteMaterialUrls', url));
  speakerIds.forEach((id) => queryParams.append('speakerIds', id.toString()));
  const queryString = queryParams.toString();
  const url = queryString
    ? `/admin/seminars/${seminarId}/files?${queryString}`
    : `/admin/seminars/${seminarId}/files`;

  // thumbnailFile, materials, speakerProfiles는 request body(FormData)로 전송
  // Content-Type은 Axios가 boundary 포함해서 자동 설정하도록 헤더 미지정
  const formData = new FormData();

  if (thumbnailFile) {
    formData.append('thumbnailFile', thumbnailFile);
  }

  if (materials && materials.length > 0) {
    materials.forEach((file) => {
      formData.append('materials', file);
    });
  }

  if (speakerProfiles && speakerProfiles.length > 0) {
    speakerProfiles.forEach((file) => {
      formData.append('speakerProfiles', file);
    });
  }

  const res = await adminInstance.patch<EmptyResultResponse>(url, formData);

  return res.data;
};
