import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getHomeLink, postHomeLink, deleteHomeLink } from '../../apis/HomeManage/homeLinkApi';
import type { HomeLinkResponse, PostHomeLinkRequest } from '../../types/HomeManage/homeLink';
import { QUERY_KEYS } from '../../constants/queryKey';

// 링크 조회
export const useHomeLink = () => {
  return useQuery<HomeLinkResponse>({
    queryKey: [QUERY_KEYS.ADMIN_HOME_LINK],
    queryFn: getHomeLink,
  });
};

// 링크 등록, 수정
export const usePostHomeLink = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: PostHomeLinkRequest) => postHomeLink(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ADMIN_HOME_LINK] });
    },
  });
};

//링크 삭제
export const useDeleteHomeLink = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteHomeLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ADMIN_HOME_LINK] });
    },
  });
};
