import { adminInstance } from '../adminInstance';
import type {
  HomeReviewListResponse,
  DeleteHomeReviewResponse,
  PutHomeReviewOrderRequest,
  PutHomeReviewOrderResponse,
} from '../../types/HomeManage/homeReview';

export const getHomeReviews = async (): Promise<HomeReviewListResponse> => {
  const res = await adminInstance.get<HomeReviewListResponse>('/admin/home/reviews');
  return res.data;
};

export const deleteHomeReview = async (reviewId: string): Promise<DeleteHomeReviewResponse> => {
  const res = await adminInstance.delete<DeleteHomeReviewResponse>(
    `/admin/home/reviews/${reviewId}`
  );
  return res.data;
};

export const putHomeReviewOrder = async (
  body: PutHomeReviewOrderRequest
): Promise<PutHomeReviewOrderResponse> => {
  const res = await adminInstance.put<PutHomeReviewOrderResponse>(
    '/admin/home/reviews/order',
    body
  );
  return res.data;
};
