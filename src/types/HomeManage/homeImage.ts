import type { CommonResponse } from '../common';

export interface HomeImageItem {
  imageId: string;
  url: string;
  fileName: string;
  contentType: string;
  updatedAt: string;
}

export interface HomeImageListResult {
  intro: HomeImageItem | null;
  previousSeminar: HomeImageItem | null;
}
export type HomeImageListResponse = CommonResponse<HomeImageListResult>;

export interface PostHomeImageParams {
  type: 'INTRO' | 'PREVIOUS_SEMINAR';
  file: File;
}

export type PostHomeImageResponse = CommonResponse;

export interface DeleteHomeImageRequest {
  type: 'INTRO' | 'PREVIOUS_SEMINAR';
}

export type DeleteHomeImageResponse = CommonResponse;
