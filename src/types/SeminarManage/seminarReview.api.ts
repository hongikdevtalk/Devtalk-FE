import type { CommonResponse } from '../common';

export interface ReviewData {
  reviewId: number;
  name: string;
  studentNum: string;
  department: string;
  grade: string;
  score: number;
  strength: string;
  improvement: string;
  nextTopic: string;
  isPublic: boolean;
  isFeatured: boolean;
}

export interface ReviewListData {
  seminarNum: number;
  reviews: ReviewData[];
}

export type ReviewListResponse = CommonResponse<ReviewListData>;

export type SeminarReviewRequest = {
  seminarId: number | string;
  totalContent: string;
  score: number;
};

export interface SeminarReview {
  reviewId: number;
  seminarId: number;
}

export type SeminarReviewResponse = CommonResponse<SeminarReview>;
