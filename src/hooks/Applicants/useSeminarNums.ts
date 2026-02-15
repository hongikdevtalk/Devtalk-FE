import { useQuery } from '@tanstack/react-query';
import type { SeminarNumsResponse } from '../../types/Applicants/seminarNums.api';
import { getSeminarNums } from '../../apis/Applicants/seminarNumsApi';
import { QUERY_KEYS } from '../../constants/queryKey';

// 세미나 번호 목록 조회
export const useSeminarNums = () => {
  return useQuery<SeminarNumsResponse>({
    queryKey: [QUERY_KEYS.ADMIN_SEMINAR_NUMS],
    queryFn: getSeminarNums,
  });
};
