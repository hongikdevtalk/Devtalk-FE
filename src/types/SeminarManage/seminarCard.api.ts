import type { CommonResponse } from '../common';

export interface SeminarCardData {
  seminarId: number;
  seminarNum: number;
  seminarTopic: string;
  seminarDate: string;
  place: string;
  imageUrl: string;
}

export interface SeminarListResult {
  seminarList: SeminarCardData[];
}

export type SeminarListResponse = CommonResponse<SeminarListResult>;
