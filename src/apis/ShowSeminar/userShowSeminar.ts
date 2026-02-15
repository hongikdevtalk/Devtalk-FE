import type { ShowSeminarResponse } from '../../types/ShowSeminar/userShowSeminar';
import { publicInstance } from '../userInstance';

// 유저 홈화면에서 노출할 세미나 회차 응답 api
export const getShowSeminar = async (): Promise<ShowSeminarResponse> => {
  const res = await publicInstance.get<ShowSeminarResponse>(`/show-seminar`);
  return res.data;
};
