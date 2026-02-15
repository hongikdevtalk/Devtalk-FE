import { useSeminarDetail } from './useSeminarDetail';
import { useSeminarReviews } from './useSeminarReviews';
import { mapApiDataToState } from '../../../utils/seminarMapper';
import { useMemo } from 'react';

export const useSeminarData = (seminarId: number | undefined) => {
  const {
    data: detailResponse,
    isLoading: isDetailLoading,
    error: detailError,
  } = useSeminarDetail(seminarId);

  const {
    data: reviewResponse,
    isLoading: isReviewLoading,
    error: reviewError,
  } = useSeminarReviews(seminarId);

  const seminarData = useMemo(() => {
    if (!detailResponse?.result) return null;
    return mapApiDataToState(detailResponse.result);
  }, [detailResponse?.result]);

  const reviews = useMemo(() => {
    return reviewResponse?.result || [];
  }, [reviewResponse?.result]);

  return {
    seminarData,
    reviews,
    isLoading: isDetailLoading || isReviewLoading,
    error: detailError || reviewError,
  };
};
