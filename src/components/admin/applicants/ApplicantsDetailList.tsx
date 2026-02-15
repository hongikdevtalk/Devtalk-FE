import { useState, useEffect } from 'react';
import emptybox from '../../../assets/icons/components/SeminarApply/emptybox.svg';
import checkbox from '../../../assets/icons/components/SeminarApply/checkbox.svg';

// 지원자 데이터 타입
interface Applicant {
  id: number;           // 각 지원자의 고유 ID (React의 key로 사용)
  appliedAt: string;    // 신청시각
  seminarName: string;  // 세미나명
  studentId: string;    // API 요청용 studentId (ApplicantData의 studentId)
  studentNum: string;   // 학번 (표시용)
  department: string;   // 학과명
  grade: string;        // 학년
  name: string;         // 지원자 이름
  contact: string;      // 연락처
  email: string;        // 이메일
  attendanceType: string; // 온/오프라인 참여 여부
  referralSource: string; // 이번 세미나를 알게 된 경로
  isAttendance?: boolean; // 출석 여부
}

// 컴포넌트 props 타입 정의
interface ApplicantsDetailListProps {
  applicants: Applicant[];
  onAttendanceUpdate?: (studentId: string, check: boolean) => Promise<void>;
}

const ApplicantsDetailList: React.FC<ApplicantsDetailListProps> = ({
  applicants: initialApplicants,
  onAttendanceUpdate
}) => {
  // 출석 상태 관리
  const [applicants, setApplicants] = useState(initialApplicants);
  const [isLoading, setIsLoading] = useState<number | null>(null);

  // initialApplicants 변경 시 state 업데이트
  useEffect(() => {
    setApplicants(initialApplicants);
  }, [initialApplicants]);

  // 공통 헤더 스타일
  const headerStyle = "border border-grey-400 px-5 py-3 text-center subhead-1-semibold text-white";

  // 공통 데이터 셀 스타일
  const cellStyle = "border border-grey-400 px-5 py-3 text-center body-1-semibold text-white ";

  // 헤더 목록
  const headers = ['신청시각', '세미나명', '학번', '학과', '학년', '이름', '연락처', '이메일', '온/오프라인 참여 여부', '이번 세미나를 알게 된 경로', '출석'];

  // 데이터 키 목록 (applicant 객체의 속성명과 매칭)
  const dataKeys = ['appliedAt', 'seminarName', 'studentNum', 'department', 'grade', 'name', 'contact', 'email', 'attendanceType', 'referralSource'] as const;

  // 출석 토글 함수
  const toggleAttendance = async (id: number, studentId: string) => {
    const applicant = applicants.find(a => a.id === id);
    if (!applicant) return;

    setIsLoading(id);
    const newCheckStatus = !applicant.isAttendance;

    try {
      // API 호출
      if (onAttendanceUpdate) {
        await onAttendanceUpdate(studentId, newCheckStatus);
      }

      // UI 업데이트
      setApplicants(applicants.map(a =>
        a.id === id
          ? { ...a, isAttendance: newCheckStatus }
          : a
      ));
    } catch (error) {
      console.error('출석 체크 업데이트 실패:', error);
    } finally {
      setIsLoading(null);
    }
  };
  return (
    <div className="w-full">
      {/* 테이블이 화면보다 클 때 가로/세로 스크롤바 표시 */}
      <div className={`overflow-x-auto overflow-y-auto max-h-[calc(100vh-150px)] ${applicants.length === 0 ? 'flex justify-center' : ''}`}>
        <table className="min-w-max border-collapse">

          {/* 테이블 헤더 */}
          <thead>
            <tr className="bg-grey-900">
              {headers.map((header) => (
                <th key={header} className={headerStyle}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          {/* 테이블 본문 */}
          <tbody>
            {applicants.map((applicant) => (
              <tr key={applicant.id} className="bg-grey-700 hover:ring-2 hover:ring-green-300 hover:ring-inset cursor-pointer">
                {dataKeys.map((key) => (
                  <td key={key} className={cellStyle}>
                    {applicant[key]}
                  </td>
                ))}
                <td className={cellStyle}>
                  <button
                    onClick={() => toggleAttendance(applicant.id, applicant.studentId)}
                    className="flex items-center justify-center w-full h-full disabled:opacity-50 cursor-pointer"
                    type="button"
                    disabled={isLoading === applicant.id}
                  >
                    <img
                      src={applicant.isAttendance ? checkbox : emptybox}
                      alt={applicant.isAttendance ? '출석' : '미출석'}
                      className="w-6 h-6"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 지원자가 없을 때 */}
      {applicants.length === 0 && (
        <div className="text-center py-8 text-white subhead-1-medium">
          신청자가 없습니다.
        </div>
      )}
    </div>
  );
};


export default ApplicantsDetailList;