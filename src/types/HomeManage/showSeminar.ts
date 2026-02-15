import type { CommonResponse } from '../common';

interface ShowSeminar {
  seminarId: number;
  seminarNum: number;
  applicantActivate: boolean;
  liveActivate: boolean;
}

export type ShowSeminarResponse = CommonResponse<ShowSeminar>;

export interface ShowSeminarRequest {
  seminarNum: number | null;
  applicantActivate: boolean;
  liveActivate: boolean;
}
