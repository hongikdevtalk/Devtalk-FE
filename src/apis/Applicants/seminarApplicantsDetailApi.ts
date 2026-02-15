import type { SeminarApplicantsDetailResponse } from '../../types/Applicants/seminarApplicantsDetail.api';
import { adminInstance } from '../adminInstance';

export const getSeminarApplicantsDetail = async (
  seminarId: string
): Promise<SeminarApplicantsDetailResponse> => {
  const res = await adminInstance.get<SeminarApplicantsDetailResponse>(
    `/admin/seminars/${seminarId}/applicants`
  );
  return res.data;
};

// 세미나 신청자 출석 체크 업데이트
export const postupdateAttendanceCheck = async (
  seminarId: string,
  studentId: string,
  check: boolean
): Promise<void> => {
  await adminInstance.post(
    `/admin/seminars/${seminarId}/applicants/${studentId}?check=${check}`
  );
};
