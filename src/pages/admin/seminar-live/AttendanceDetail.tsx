import { useParams } from 'react-router-dom';
import BackButton from '../../../components/Button/BackButton';
import AttendanceDetailList from '../../../components/admin/attendance/AttendanceDetailList';
import { useSeminarApplicantsDetail } from '../../../hooks/Applicants/useSeminarApplicantsDetail';

const AttendanceDetail = () => {
  const { seminarId } = useParams<{ seminarId: string }>();
  const { data: applicantsData } = useSeminarApplicantsDetail(seminarId!);

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

  const attendances =
    applicantsData?.result?.students?.map((applicant, index) => ({
      id: index + 1,
      seminarName: applicant.topic,
      studentNum: applicant.studentNum,
      name: applicant.name,
      contact: applicant.phone,
      attendanceTime: applicant.checkInTime ? formatDateKorean(applicant.checkInTime) : '-',
      isAttendance: !!applicant.checkInTime,
    })) || [];

  const seminarTitle = `제 ${applicantsData?.result?.seminarNum}회 Devtalk 세미나 출석부`;

  return (
    <div className="py-11">
      <div className="flex items-center ml-[39px] mr-7 mb-[23px]">
        <BackButton className="w-7 h-7 flex-shrink-0 mr-[39px]" />
        <h1 className="text-white heading-1-bold">{seminarTitle}</h1>
      </div>
      <div className="ml-[21.5px]">
        <AttendanceDetailList attendances={attendances} />
      </div>
    </div>
  );
};

export default AttendanceDetail;
