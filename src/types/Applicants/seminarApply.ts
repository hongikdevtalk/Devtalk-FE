import type { CommonResponse } from '../common';

// 세미나 신청 요청 타입
export type SeminarApplyRequest = {
  studentNum: string;
  name: string;
  grade: number | null;
  gradeEtc: string | null;
  email: string;
  phone: string;
  departments: string[] | null;
  departmentEtc: string | null;
  participationType: string;
  inflowPath: string;
  inflowPathEtc: string | null;
  questions: {
    sessionId: number;
    content: string;
  }[];
};

// 세미나 신청 응답 타입
export type SeminarApplyResponse = CommonResponse<{
  studentId: number;
  seminarId: number;
  applicantId: number;
  mailSent: boolean;
}>;
