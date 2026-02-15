import { adminInstance } from '../adminInstance';
import type {
  getFAQResponse,
  PostFAQRequest,
  PostFAQResponse,
  DeleteFAQResponse,
} from '../../types/HomeManage/homeFAQ';

export const getFAQLink = async (): Promise<getFAQResponse> => {
  const res = await adminInstance.get<getFAQResponse>('/admin/home/faq-link');
  return res.data;
};

export const postFAQLink = async (body: PostFAQRequest): Promise<PostFAQResponse> => {
  const res = await adminInstance.post<PostFAQResponse>('/admin/home/faq-link', body);
  return res.data;
};

export const deleteFAQLink = async (): Promise<DeleteFAQResponse> => {
  const res = await adminInstance.delete<DeleteFAQResponse>('/admin/home/faq-link');
  return res.data;
};
