import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getHomeImages, postHomeImage, deleteHomeImage } from '../../apis/HomeManage/homeImageApi';
import type {
  HomeImageListResponse,
  PostHomeImageParams,
  DeleteHomeImageRequest,
} from '../../types/HomeManage/homeImage';
import { QUERY_KEYS } from '../../constants/queryKey';

export const useHomeImages = () => {
  return useQuery<HomeImageListResponse>({
    queryKey: [QUERY_KEYS.ADMIN_HOME_IMAGES],
    queryFn: getHomeImages,
  });
};

export const useUploadHomeImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: PostHomeImageParams) => postHomeImage(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ADMIN_HOME_IMAGES] });
    },
  });
};

export const useDeleteHomeImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: DeleteHomeImageRequest) => deleteHomeImage(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ADMIN_HOME_IMAGES] });
    },
  });
};
