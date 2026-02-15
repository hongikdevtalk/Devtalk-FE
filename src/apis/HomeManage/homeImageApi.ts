import { adminInstance } from '../adminInstance';
import type {
  HomeImageListResponse,
  PostHomeImageParams,
  PostHomeImageResponse,
  DeleteHomeImageRequest,
  DeleteHomeImageResponse,
} from '../../types/HomeManage/homeImage';

export const getHomeImages = async (): Promise<HomeImageListResponse> => {
  const res = await adminInstance.get<HomeImageListResponse>('/admin/home/images');
  return res.data;
};

export const postHomeImage = async ({
  type,
  file,
}: PostHomeImageParams): Promise<PostHomeImageResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  const res = await adminInstance.post<PostHomeImageResponse>(
    `/admin/home/images?type=${type}`,
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );

  return res.data;
};

export const deleteHomeImage = async (
  body: DeleteHomeImageRequest
): Promise<DeleteHomeImageResponse> => {
  const res = await adminInstance.delete<DeleteHomeImageResponse>('/admin/home/images', {
    data: body,
  });
  return res.data;
};
