import { publicInstance } from '../apis/userInstance';

export interface Speaker {
  name: string;
  organization: string;
  history: string;
  profileUrl: string;
  speakerTags: string[];
  speakerId: number;
}

export interface Session {
  sessionId: number;
  title: string;
  description: string;
  speaker: Speaker;
}

export interface PopularTagsResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: Session[];
}

export const getPopularTags = async (): Promise<PopularTagsResponse> => {
  const res = await publicInstance.get<PopularTagsResponse>('/user/seminars/search/tag/popular');
  return res.data;
};
