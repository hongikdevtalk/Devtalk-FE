import { useQuery } from '@tanstack/react-query';
import type { SeminarListResponse } from '../../../types/SeminarManage/seminarCard.api';
import { getSeminarCard } from '../../../apis/SeminarCard/seminarCardApi';
import { QUERY_KEYS } from '../../../constants/queryKey';

// 세미나 카드 조회
export const useSeminarCards = () => {
  return useQuery<SeminarListResponse>({
    queryKey: [QUERY_KEYS.ADMIN_SEMINAR_CARDS],
    queryFn: getSeminarCard,
  });
};
