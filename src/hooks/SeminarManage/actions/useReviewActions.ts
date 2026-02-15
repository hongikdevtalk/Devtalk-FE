import { useRegisterReviewToHome, useUnregisterReviewFromHome } from '../data/useSeminarReviews';

interface UseReviewActionsProps {
  seminarId: number;
}

export const useReviewActions = ({ seminarId }: UseReviewActionsProps) => {
  const { mutate: registerReview, isPending: isRegistering } = useRegisterReviewToHome(seminarId);
  const { mutate: unregisterReview, isPending: isUnregistering } =
    useUnregisterReviewFromHome(seminarId);

  const isLoading = isRegistering || isUnregistering;

  // 후기의 홈 화면 등록 핸들러
  const handleRegisterReviewToHome = (reviewId: number) => {
    if (isRegistering) return;

    registerReview(reviewId, {
      onError: (error) => {
        alert('홈 화면 등록에 실패했습니다. 다시 시도해주세요.');
        console.error(error);
      },
    });
  };

  // 후기의 홈 화면 해제 핸들러
  const handleUnregisterReviewFromHome = (reviewId: number) => {
    if (isUnregistering) return;

    unregisterReview(reviewId, {
      onError: (error) => {
        alert('홈 화면 해제에 실패했습니다. 다시 시도해주세요.');
        console.error(error);
      },
    });
  };

  return {
    handleRegisterReviewToHome,
    handleUnregisterReviewFromHome,
    isLoading,
  };
};
