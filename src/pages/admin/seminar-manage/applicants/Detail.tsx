import { useParams } from 'react-router-dom';
import ApplicantsDetailList from './../../../../components/admin/applicants/ApplicantsDetailList';
import BackButton from './../../../../components/Button/BackButton';
import ExcelDownloadButton from './../../../../components/Button/ExcelDownloadButton';
import { useSeminarApplicantsDetail, useUpdateAttendanceCheck } from '../../../../hooks/Applicants/useSeminarApplicantsDetail';

const Detail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: applicantsData } = useSeminarApplicantsDetail(id!);
  const { mutate: updateAttendance } = useUpdateAttendanceCheck(id!);

  // 날짜 포맷 함수 (YYYY. M. DD 오전/오후 H:MM:SS)
  const formatDateKorean = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const period = hours >= 12 ? '오후' : '오전';
    const hour12 = hours % 12 || 12;

    return `${year}. ${month}. ${day} ${period} ${hour12}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  // inflowPath 매핑 함수
  const getInflowPathLabel = (inflowPath: string) => {
    const inflowPathMap: { [key: string]: string } = {
      FRIEND: '지인',
      PROFESSOR: '교수님 추천',
      EVERYTIME: '에브리타임',
      DEPARTMENT: '학과 공지방',
      CLUB: '학회/동아리 공지방',
      CAMPUS: '교내 포스터 / X배너',
      INSTAGRAM: '인스타그램',
    };
    return inflowPathMap[inflowPath] || inflowPath;
  };

  // 출석 여부 매핑 함수
  const getAttendanceLabel = (isAttendance: boolean | undefined) => {
    const attendanceMap: { [key: string]: string } = {
      'true': '출석',
      'false': '미출석',
    };
    return attendanceMap[String(isAttendance)] || '';
  };

  // 출석 체크 업데이트 핸들러
  const handleAttendanceUpdate = async (studentId: string, check: boolean) => {
    return new Promise<void>((resolve, reject) => {
      updateAttendance(
        { studentId, check },
        {
          onSuccess: () => resolve(),
          onError: (error) => reject(error),
        }
      );
    });
  };

  // API 응답 데이터를 컴포넌트에서 사용하는 형식으로 변환
  const applicants =
    applicantsData?.result?.students?.map((applicant, index) => ({
      id: index + 1,
      appliedAt: formatDateKorean(applicant.appliedAt),
      seminarName: applicant.topic,
      studentId: applicant.studentId,
      studentNum: applicant.studentNum,
      department: applicant.department,
      grade: applicant.grade,
      name: applicant.name,
      contact: applicant.phone,
      email: applicant.email,
      attendanceType: applicant.participationType === 'ONLINE' ? '온라인' : '오프라인',
      referralSource: getInflowPathLabel(applicant.inflowPath),
      isAttendance: applicant.attendenceCheck,
    })) || [];

  const seminarTitle = `제 ${applicantsData?.result?.seminarNum}회 Devtalk Seminar`;

  // 엑셀 다운로드용 데이터 (출석 여부를 한글로 변환)
  const applicantsForExcel = applicants.map(applicant => ({
    ...applicant,
    isAttendance: getAttendanceLabel(applicant.isAttendance)
  }));

  // 엑셀 다운로드용 헤더 매핑
  const excelHeaders = {
    appliedAt: '신청시각',
    seminarName: '세미나명',
    studentNum: '학번',
    department: '학과',
    grade: '학년',
    name: '이름',
    contact: '연락처',
    email: '이메일',
    attendanceType: '온/오프라인 참여 여부',
    referralSource: '이번 세미나를 알게 된 경로',
    isAttendance: '출석'
  };

  return (
    <div className="py-11">
      <div className="flex items-center justify-between ml-[39px] mr-7 mb-[23px]">
        <div className="flex items-center">
          <BackButton className="w-7 h-7 flex-shrink-0 mr-[39px]" />
          <h1 className="text-white heading-1-bold">{seminarTitle}-신청자 개인정보</h1>
        </div>
        <ExcelDownloadButton
          data={applicantsForExcel}
          fileName={`${seminarTitle}_신청자_개인정보.xlsx`}
          className="subhead-1-semibold"
          headers={excelHeaders}
        />
      </div>
      <div className="ml-[21.5px]">
        <ApplicantsDetailList
          applicants={applicants}
          onAttendanceUpdate={handleAttendanceUpdate}
        />
      </div>
    </div>
  );
};

export default Detail;