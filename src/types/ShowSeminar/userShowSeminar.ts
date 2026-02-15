import type { CommonResponse } from '../common';

export interface ShowSeminarResult {
  seminarId: number | null;
  seminarNum: number | null;
  applicantActivate: boolean;
  liveActivate: boolean;
}

export type ShowSeminarResponse = CommonResponse<ShowSeminarResult>;
