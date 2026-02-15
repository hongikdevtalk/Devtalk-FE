import { adminInstance } from './adminInstance';
import type {
  AdminAccountListResponse,
  AddAdminAccountRequest,
  AddAdminAccountResponse,
  DeleteAdminAccountResponse,
} from '../types/auth';

// 관리자 아이디 리스트 조회
export const getAdminAccountList = async (): Promise<AdminAccountListResponse> => {
  const res = await adminInstance.get<AdminAccountListResponse>('admin/authority/loginIds');
  return res.data;
};

// 관리자 아이디 추가
export const postAdminAccount = async (
  data: AddAdminAccountRequest
): Promise<AddAdminAccountResponse> => {
  const res = await adminInstance.post<AddAdminAccountResponse>('admin/authority/loginIds', data);
  return res.data;
};

// 관리자 아이디 삭제
export const deleteAdminAccount = async (adminId: number): Promise<DeleteAdminAccountResponse> => {
  const res = await adminInstance.delete<DeleteAdminAccountResponse>(
    `admin/authority/loginIds/${adminId}`
  );
  return res.data;
};
