import type { UserSeminarResponse } from '../../types/userMainPage/userSeminar';
import { publicInstance } from '../userInstance';

export const getUserSeminar = async (seminarId: number): Promise<UserSeminarResponse> => {
  const res = await publicInstance.get<UserSeminarResponse>(`/user/home/${seminarId}`);
  return res.data;
};
