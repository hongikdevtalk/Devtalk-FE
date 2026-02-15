import type { ShowSeminarRequest, ShowSeminarResponse } from '../../types/HomeManage/showSeminar';
import { adminInstance } from '../adminInstance';

export const postShowSeminar = async ({
  seminarNum,
  applicantActivate,
  liveActivate,
}: ShowSeminarRequest): Promise<ShowSeminarResponse> => {
  const res = await adminInstance.post<ShowSeminarResponse>('/admin/show-seminar', {
    seminarNum,
    applicantActivate,
    liveActivate,
  });
  return res.data;
};
