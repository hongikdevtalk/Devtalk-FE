import type { SeminarListResponse } from '../types/SeminarManage/seminarCard.api';
import { publicInstance } from './userInstance';

export const getSeminarList = async (): Promise<SeminarListResponse> => {
  const res = await publicInstance.get<SeminarListResponse>('/user/seminarList/');
  return res.data;
};
