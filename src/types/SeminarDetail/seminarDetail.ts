import type { CommonResponse } from '../common';

type fileUrl = string;

//세미나 세부정보 (세미나)
export interface SeminarDetail {
  seminarId: number;
  seminarNum: number;
  topic: string;
  thumbnailUrl: fileUrl;
  startDate: string;
  endDate: string;
  seminarDate: string;
  place: string;
  fileUrls: fileUrl[];
}
export type SeminarDetailResponse = CommonResponse<SeminarDetail>;

//세미나 세부정보 (세션)
export interface SessionSpeaker {
  name: string;
  organization: string;
  history: string;
  profileUrl: fileUrl;
  speakerId: number;
}
export interface SeminarSession {
  sessionId: number;
  title: string;
  description: string;
  speaker: SessionSpeaker;
}
export type SeminarSessionResponse = CommonResponse<SeminarSession[]>;

//세미나 세부정보 (리뷰)
export interface SeminarReview {
  reviewId: number;
  seminarNum: number;
  score: number;
  strength: string;
}
export type SeminarReviewResponse = CommonResponse<SeminarReview[]>;
