import { useMutation } from '@tanstack/react-query';
import type { AttendResponse } from '../../types/SeminarLive/seminarAuth';
import { postSeminarAttend } from '../../apis/SeminarLive/seminarAttend';

export const useSeminarAttend = () => {
  return useMutation<AttendResponse, Error>({
    mutationFn: postSeminarAttend,
  });
};
