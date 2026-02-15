import { useMemo } from 'react';
import { STORAGE_KEY } from '../../constants/key';
import { decodeJwt } from '../../utils/decodeJWT.ts';

export interface CurrentAdminInfo {
  adminId: number | null;
  loginId: string | null;
}

export const useCurrentAdmin = (): CurrentAdminInfo => {
  const token = localStorage.getItem(STORAGE_KEY.ADMIN_ACCESS_TOKEN);
  const info = useMemo<CurrentAdminInfo>(() => {
    const claims = decodeJwt<any>(token);
    const adminId = (claims?.adminId ?? claims?.id ?? null) as number | null;
    const loginId = (claims?.loginId ?? claims?.sub ?? null) as string | null;
    return { adminId, loginId };
  }, [token]);

  return info;
};
