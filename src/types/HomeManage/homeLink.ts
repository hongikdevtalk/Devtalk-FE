import type { CommonResponse } from '../common';

export type HomeLinkResponse = CommonResponse<{ url: string | null }>;

export interface PostHomeLinkRequest {
  url: string;
}

export type PostHomeLinkResponse = CommonResponse;

export type DeleteHomeLinkResponse = CommonResponse;
