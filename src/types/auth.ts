import type { CommonResponse } from './common';

//로그인 로그아웃 관련 타입
export interface LoginRequest {
  loginId: string;
  password: string;
}

export interface LoginResult {
  adminId: number;
  accessToken: string;
  refreshToken: string;
}

export type LoginResponse = CommonResponse<LoginResult>;

export interface LogoutRequest {
  refreshToken: string;
}

export type LogoutResponse = CommonResponse<null>;

// 관리자 계정 관리 관련 타입
export interface AdminAccount {
  adminId: number;
  name: string;
  loginId: string;
}

export interface AdminAccountListResult {
  adminIdList: AdminAccount[];
}

export type AdminAccountListResponse = CommonResponse<AdminAccountListResult>;

export interface AddAdminAccountRequest {
  name: string;
  loginId: string;
  password: string;
}

export interface AddAdminAccountResult {
  adminId: number;
}

export type AddAdminAccountResponse = CommonResponse<AddAdminAccountResult>;

export type DeleteAdminAccountResponse = CommonResponse<null>;
