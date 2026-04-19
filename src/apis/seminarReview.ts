import type { SeminarReviewRequest, SeminarReviewResponse } from '../types/seminarReview';
import { userInstance } from './userInstance';

export const postSeminarReview = async ({
  seminarId,
  totalContent,
  score,
}: SeminarReviewRequest): Promise<SeminarReviewResponse> => {
  const res = await userInstance.post<SeminarReviewResponse>(
    `/archive/seminars/${seminarId}/reviews`,
    { totalContent, score }
  );
  return res.data;
};
