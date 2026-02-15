import { useMutation } from '@tanstack/react-query';
import type { AuthRequest, AuthResponse } from '../../types/SeminarLive/seminarAuth';
import { postseminarAuth } from '../../apis/SeminarLive/seminarAuth';

export const useSeminarAuth = () => {
  return useMutation<AuthResponse, Error, AuthRequest>({
    mutationFn: postseminarAuth,
  });
};
