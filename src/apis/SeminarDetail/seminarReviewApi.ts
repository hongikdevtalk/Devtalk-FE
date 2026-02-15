import type { EmptyResultResponse } from '../../types/common';
import type { ReviewListResponse } from '../../types/SeminarManage/seminarReview.api';
import { adminInstance } from '../adminInstance';

// 세미나 후기 목록 조회
export const getSeminarReview = async (seminarId: number): Promise<ReviewListResponse> => {
  const res = await adminInstance.get<ReviewListResponse>(`/admin/seminars/${seminarId}/reviews`);
  return res.data;
};

// 세미나 후기 공개
export const patchReviewRegister = async (reviewId: number): Promise<EmptyResultResponse> => {
  const res = await adminInstance.patch<EmptyResultResponse>(
    `/admin/seminars/reviews/${reviewId}/home/on`
  );
  return res.data;
};

// 세미나 후기 비공개
export const patchReviewUnregister = async (reviewId: number): Promise<EmptyResultResponse> => {
  const res = await adminInstance.patch<EmptyResultResponse>(
    `/admin/seminars/reviews/${reviewId}/home/off`
  );
  return res.data;
};
