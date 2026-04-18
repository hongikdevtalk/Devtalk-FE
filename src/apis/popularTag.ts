import { publicInstance } from '../apis/userInstance';

export interface PopularTagsResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: string[];
}

export const getPopularTags = async (): Promise<PopularTagsResponse> => {
  const res = await publicInstance.get<PopularTagsResponse>('/user/seminars/search/tag/popular');
  return res.data;
};
