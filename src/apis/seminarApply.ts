import { publicInstance } from '../apis/userInstance';
import type { SeminarApplyRequest, SeminarApplyResponse } from '../types/Applicants/seminarApply';
import type { EmptyResultResponse } from '../types/common';

export const postApplySeminar = async (
  data: SeminarApplyRequest
): Promise<SeminarApplyResponse> => {
  const res = await publicInstance.post<SeminarApplyResponse>('/user/seminars', data);
  return res.data;
};

export const getDuplicateCheck = async (studentNum: string): Promise<EmptyResultResponse> => {
  const res = await publicInstance.get<EmptyResultResponse>('/user/seminars/duplicate-check', {
    params: { studentNum },
  });
  return res.data;
};
