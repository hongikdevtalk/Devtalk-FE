import type { CommonResponse } from '../common';

export interface ApplicantData {
  topic: string;
  studentId: string;
  studentNum: string;
  department: string;
  grade: string;
  name: string;
  phone: string;
  email: string;
  participationType: 'ONLINE' | 'OFFLINE';
  inflowPath: string;
  attendenceCheck: boolean;
}

export interface SeminarApplicantsDetailResult {
  seminarNum: number;
  students: ApplicantData[];
}

export type SeminarApplicantsDetailResponse = CommonResponse<SeminarApplicantsDetailResult>;
