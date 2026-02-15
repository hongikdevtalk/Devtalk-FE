import type { CommonResponse } from '../common';

// FAQ 링크 조회
export type getFAQResponse = CommonResponse<{
  linkId: string;
  url: string;
  updatedAt: string;
  updatedBy: string;
}>;

// FAQ 링크 추가/수정
export type PostFAQRequest = {
  url: string;
};
export type PostFAQResponse = CommonResponse<{
  linkId: string;
  url: string;
  updatedAt: string;
  updatedBy: string;
}>;

// FQA 링크 삭제
export type DeleteFAQResponse = CommonResponse<{
  linkId: string;
}>;
