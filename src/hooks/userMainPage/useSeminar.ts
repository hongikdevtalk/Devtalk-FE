import { useQuery } from '@tanstack/react-query';
import type { UserSeminarResponse } from '../../types/userMainPage/userSeminar';
import { getUserSeminar } from '../../apis/userSeminar/userSeminarApi';

export const useGetUserSeminar = (seminarId: number) => {
  return useQuery<UserSeminarResponse, Error>({
    queryKey: ['userSeminar', seminarId],
    queryFn: () => getUserSeminar(seminarId),
  });
};
