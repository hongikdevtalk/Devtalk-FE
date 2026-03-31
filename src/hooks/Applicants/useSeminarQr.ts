import { useQuery } from '@tanstack/react-query';
import type { SeminarQrResponse } from '../../types/Applicants/seminarQr.api';
import { getSeminarQr } from '../../apis/Applicants/seminarQrApi';
import { QUERY_KEYS } from '../../constants/queryKey';

export const useSeminarQr = (seminarId: number) => {
  return useQuery<SeminarQrResponse>({
    queryKey: [QUERY_KEYS.ADMIN_SEMINAR_QR, seminarId],
    queryFn: () => getSeminarQr(seminarId),
    enabled: !!seminarId,
  });
};
