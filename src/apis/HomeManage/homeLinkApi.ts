import { adminInstance } from '../adminInstance';
import type {
  HomeLinkResponse,
  PostHomeLinkRequest,
  PostHomeLinkResponse,
  DeleteHomeLinkResponse,
} from '../../types/HomeManage/homeLink';

export const getHomeLink = async (): Promise<HomeLinkResponse> => {
  const res = await adminInstance.get<HomeLinkResponse>('/admin/home/inquiry-link');
  return res.data;
};

export const postHomeLink = async (body: PostHomeLinkRequest): Promise<PostHomeLinkResponse> => {
  const res = await adminInstance.post<PostHomeLinkResponse>('/admin/home/inquiry-link', body);
  return res.data;
};

export const deleteHomeLink = async (): Promise<DeleteHomeLinkResponse> => {
  const res = await adminInstance.delete<DeleteHomeLinkResponse>('/admin/home/inquiry-link');
  return res.data;
};
