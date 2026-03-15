import type { SeminarReviewRequest, SeminarReviewResponse } from '../types/seminarReview';
import { userInstance } from './userInstance';

export const postSeminarReview = async ({
  review,
  score,
}: SeminarReviewRequest): Promise<SeminarReviewResponse> => {
  const res = await userInstance.post<SeminarReviewResponse>('/user/live/review', {
    review,
    score,
  });
  return res.data;
};
