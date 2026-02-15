import type { AttendResponse } from '../../types/SeminarLive/seminarAuth';
import { userInstance } from '../userInstance';

export const postSeminarAttend = async (): Promise<AttendResponse> => {
  const res = await userInstance.post<AttendResponse>('/user/live/attend');
  return res.data;
};
