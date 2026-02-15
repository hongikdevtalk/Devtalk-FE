import type { CommonResponse } from '../common';

export interface UserSeminarResult {
  seminarId: number;
  seminarNum: number;
  topic: string;
  seminarDate: string;
  place: string;
  startDate: string;
  endDate: string;
  sessionIds: number[];
}

export type UserSeminarResponse = CommonResponse<UserSeminarResult>;
