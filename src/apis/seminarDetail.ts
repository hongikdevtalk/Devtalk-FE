import type {
  SeminarDetailResponse,
  SeminarReviewResponse,
  SeminarSessionResponse,
} from '../types/SeminarDetail/seminarDetail';
import { publicInstance } from './userInstance';

//세미나 세부정보 (세미나)
export const getSeminarDetail = async (seminarId: number): Promise<SeminarDetailResponse> => {
  const res = await publicInstance.get<SeminarDetailResponse>(`/user/seminars/${seminarId}`);
  return res.data;
};

//세미나 세부정보 (세션)
export const getSeminarSession = async (seminarId: number): Promise<SeminarSessionResponse> => {
  const res = await publicInstance.get<SeminarSessionResponse>(
    `/user/seminars/${seminarId}/session`
  );
  return res.data;
};

//세미나 세부정보 (리뷰)
export const getSeminarReview = async (seminarId: number): Promise<SeminarReviewResponse> => {
  const res = await publicInstance.get<SeminarReviewResponse>(`/user/seminars/${seminarId}/review`);
  return res.data;
};
