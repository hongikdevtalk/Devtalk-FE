import { useQuery } from '@tanstack/react-query';
import type { SeminarQuestionsResponse } from '../../types/Applicants/seminarQuestions.api';
import { getSeminarQuestions } from '../../apis/Applicants/seminarQuestionsApi';
import { QUERY_KEYS } from '../../constants/queryKey';

// 세미나별 연사 질문 조회
export const useSeminarQuestions = (seminarId: string) => {
  return useQuery<SeminarQuestionsResponse>({
    queryKey: [QUERY_KEYS.ADMIN_SEMINAR_QUESTIONS, seminarId],
    queryFn: () => getSeminarQuestions(seminarId),
    enabled: !!seminarId,
  });
};
