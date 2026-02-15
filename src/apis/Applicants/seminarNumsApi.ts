import type { SeminarNumsResponse } from '../../types/Applicants/seminarNums.api';
import { adminInstance } from '../adminInstance';

export const getSeminarNums = async (): Promise<SeminarNumsResponse> => {
  const res = await adminInstance.get<SeminarNumsResponse>('/admin/seminars/nums');
  return res.data;
};
