import type { SeminarQrResponse } from '../../types/Applicants/seminarQr.api';
import { adminInstance } from '../adminInstance';

export const getSeminarQr = async (seminarId: number): Promise<SeminarQrResponse> => {
  const res = await adminInstance.post<SeminarQrResponse>(
    `/admin/seminars/${seminarId}/applicants/qr`,
  );
  return res.data;
};
