import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postAdminAccount } from '../../apis/authManageApi';
import type { AddAdminAccountRequest } from '../../types/auth';
import { QUERY_KEYS } from '../../constants/queryKey';

//관리자 계정 추가 훅
export const useAddAdminAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AddAdminAccountRequest) => postAdminAccount(data),
    onSuccess: () => {
      // 성공 시 관리자 목록 다시 불러오기
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ADMIN_ACCOUNT_LIST] });
    },
  });
};
