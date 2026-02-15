import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { ReviewListResponse } from '../../../types/SeminarManage/seminarReview.api';
import {
  getSeminarReview,
  patchReviewRegister,
  patchReviewUnregister,
} from '../../../apis/SeminarDetail/seminarReviewApi';
import { QUERY_KEYS } from '../../../constants/queryKey';

// 세미나 후기 목록 조회
export const useSeminarReviews = (seminarId: number | undefined) => {
  return useQuery<ReviewListResponse>({
    queryKey: [QUERY_KEYS.ADMIN_SEMINAR_REVIEWS, seminarId],
    queryFn: () => getSeminarReview(seminarId!),
    enabled: !!seminarId,
  });
};

// 세미나 후기 홈 화면 등록
export const useRegisterReviewToHome = (seminarId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reviewId: number) => patchReviewRegister(reviewId),
    onSuccess: () => {
      if (seminarId) {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ADMIN_SEMINAR_REVIEWS, seminarId] });
      }
    },
  });
};

// 세미나 후기 홈 화면 해제
export const useUnregisterReviewFromHome = (seminarId: number | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reviewId: number) => patchReviewUnregister(reviewId),
    onSuccess: () => {
      if (seminarId) {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ADMIN_SEMINAR_REVIEWS, seminarId] });
      }
    },
  });
};
