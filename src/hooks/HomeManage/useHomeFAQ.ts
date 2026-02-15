import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getFAQLink, postFAQLink, deleteFAQLink } from '../../apis/HomeManage/homeFAQApi';
import type { getFAQResponse, PostFAQRequest } from '../../types/HomeManage/homeFAQ';
import { QUERY_KEYS } from '../../constants/queryKey';

// 링크 조회
export const useHomeFAQ = () => {
  return useQuery<getFAQResponse>({
    queryKey: [QUERY_KEYS.ADMIN_HOME_FAQ],
    queryFn: getFAQLink,
  });
};

// 링크 등록, 수정
export const usePostHomeFAQ = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: PostFAQRequest) => postFAQLink(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ADMIN_HOME_FAQ] });
    },
  });
};

// 링크 삭제
export const useDeleteHomeFAQ = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteFAQLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ADMIN_HOME_FAQ] });
    },
  });
};
