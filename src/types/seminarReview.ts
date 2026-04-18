import type { CommonResponse } from './common';

export interface SeminarReview {
  reviewId: number;
  seminarId: number | string;
}
export type SeminarReviewResponse = CommonResponse<SeminarReview>;

export type SeminarReviewRequest = {
  seminarId: number | string;
  totalContent: string;
  score: number;
};
