import type { AuthRequest, AuthResponse } from '../../types/SeminarLive/seminarAuth';
import { publicInstance } from '../userInstance';

export const postseminarAuth = async (body: AuthRequest): Promise<AuthResponse> => {
  const res = await publicInstance.post<AuthResponse>('/user/live/auth', body);
  return res.data;
};
