import { useQuery } from '@tanstack/react-query';
import { getAdminAccountList } from '../../apis/authManageApi';
import { QUERY_KEYS } from '../../constants/queryKey';

// 관리자 계정 리스트 조회 훅
export const useAdminAccountList = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.ADMIN_ACCOUNT_LIST],
    queryFn: async () => {
      const response = await getAdminAccountList();
      return response.result;
    },
  });
};
