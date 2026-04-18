import type { SeminarListResponse } from '../types/SeminarManage/seminarCard.api';
import { publicInstance } from './userInstance';
import { userInstance } from './userInstance';

export const getSeminarList = async (): Promise<SeminarListResponse> => {
  const res = await publicInstance.get<SeminarListResponse>('/user/seminarList/');
  return res.data;
};

export const getSeminarSearch = async (keyword: string): Promise<SeminarListResponse> => {
  const res = await publicInstance.get<SeminarListResponse>('/user/seminars/search', {
    params: { keyword },
  });
  return res.data;
};

export const getSpeakerSearch = async (keyword: string): Promise<SeminarListResponse> => {
  const res = await publicInstance.get<SeminarListResponse>('/user/speakers/search', {
    params: { keyword },
  });
  return res.data;
};

export const getSeminarsByTag = async (tag: string) => {
  const res = await userInstance.get('/user/seminars/search/tag/all', {
    params: { tag },
  });
  return res.data;
};
