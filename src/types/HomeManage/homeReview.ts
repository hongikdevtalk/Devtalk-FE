import type { CommonResponse } from '../common';

export interface Review {
  visible: boolean;
  reviewId: string;
  rating: number;
  title: string | null;
  content: string;
  department: string;
  grade: string;
  nextTopic: string;
  seminarNum: number;
  order: number;
  createdAt: string;
}

export type HomeReviewListResponse = CommonResponse<Review[]>;

export interface PutHomeReviewOrderRequest {
  orderedIds: string[];
}

export type PutHomeReviewOrderResponse = CommonResponse;

export type DeleteHomeReviewResponse = CommonResponse;
