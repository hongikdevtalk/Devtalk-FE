import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { SeminarApplicantsDetailResponse } from '../../types/Applicants/seminarApplicantsDetail.api';
import { getSeminarApplicantsDetail, postupdateAttendanceCheck } from '../../apis/Applicants/seminarApplicantsDetailApi';
import { QUERY_KEYS } from '../../constants/queryKey';

// 세미나별 신청자 상세 정보 조회
export const useSeminarApplicantsDetail = (seminarId: string) => {
  return useQuery<SeminarApplicantsDetailResponse>({
    queryKey: [QUERY_KEYS.ADMIN_SEMINAR_APPLICANTS_DETAIL, seminarId],
    queryFn: () => getSeminarApplicantsDetail(seminarId),
    enabled: !!seminarId,
  });
};

// 세미나 신청자 출석 체크 업데이트
export const useUpdateAttendanceCheck = (seminarId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: { studentId: string; check: boolean }) =>
      postupdateAttendanceCheck(seminarId, variables.studentId, variables.check),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ADMIN_SEMINAR_APPLICANTS_DETAIL, seminarId],
      });
    },
  });
};
