import type { SeminarListResponse } from '../../types/SeminarManage/seminarCard.api';
import { adminInstance } from '../adminInstance';

export const getSeminarCard = async (): Promise<SeminarListResponse> => {
  const res = await adminInstance.get<SeminarListResponse>('/admin/seminars/card');
  return res.data;
};
