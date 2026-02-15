import type { SeminarQuestionsResponse } from '../../types/Applicants/seminarQuestions.api';
import { adminInstance } from '../adminInstance';

export const getSeminarQuestions = async (
  seminarId: string
): Promise<SeminarQuestionsResponse> => {
  const res = await adminInstance.get<SeminarQuestionsResponse>(
    `/admin/seminars/${seminarId}/questions`
  );
  return res.data;
};
