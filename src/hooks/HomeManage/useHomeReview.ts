import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getHomeReviews,
  deleteHomeReview,
  putHomeReviewOrder,
} from '../../apis/HomeManage/homeReviewApi';
import type {
  HomeReviewListResponse,
  PutHomeReviewOrderRequest,
} from '../../types/HomeManage/homeReview';
import { QUERY_KEYS } from '../../constants/queryKey';

export const useHomeReviews = () =>
  useQuery<HomeReviewListResponse>({
    queryKey: [QUERY_KEYS.ADMIN_HOME_REVIEWS],
    queryFn: getHomeReviews,
  });

export const useDeleteHomeReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (reviewId: string) => deleteHomeReview(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ADMIN_HOME_REVIEWS] });
    },
  });
};

export const usePutHomeReviewOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: PutHomeReviewOrderRequest) => putHomeReviewOrder(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ADMIN_HOME_REVIEWS] });
    },
  });
};
