import type { SeminarReviewRequest, SeminarReviewResponse } from '../types/seminarReview';
import { userInstance } from './userInstance';

export const postSeminarReview = async ({
  strength,
  improvement,
  nextTopic,
  score,
  isPublic,
}: SeminarReviewRequest): Promise<SeminarReviewResponse> => {
  const res = await userInstance.post<SeminarReviewResponse>('/user/live/review', {
    strength,
    improvement,
    nextTopic,
    score,
    isPublic,
  });
  return res.data;
};
