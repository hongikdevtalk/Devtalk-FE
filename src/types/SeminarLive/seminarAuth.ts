import type { CommonResponse } from '../common';

// 신청자 인증 API
export type AuthRequest = {
  studentNum: string;
  name: string;
};

export type AuthResult = {
  studentId: number;
  seminarId: number;
  accessToken: string;
  refreshToken: string;
};

export type AuthResponse = CommonResponse<AuthResult>;

// 세미나 라이브 출석 체크 API
export type AttendResponse = CommonResponse<{
  liveUrl: string;
  attendanceStatus: string;
}>;
