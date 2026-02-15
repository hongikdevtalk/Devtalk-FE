import type { CommonResponse } from '../common';

export interface SeminarItem {
  seminarId: number;
  seminarNum: number;
}

export type SeminarNumsResult = SeminarItem[];

export type SeminarNumsResponse = CommonResponse<SeminarNumsResult>;
