import { useParams } from 'react-router-dom';
import BackButton from '../../../components/Button/BackButton';
import AttendanceDetailList from '../../../components/admin/attendance/AttendanceDetailList';
import { useSeminarNums } from '../../../hooks/Applicants/useSeminarNums';

const AttendanceDetail = () => {
  const { seminarId } = useParams<{ seminarId: string }>();
  const { data: seminarNumsData } = useSeminarNums();

  const seminar = seminarNumsData?.result?.find(
    (item) => item.seminarId === Number(seminarId),
  );

  const seminarTitle = `제 ${seminar?.seminarNum}회 Devtalk 세미나 출석부`;

  return (
    <div className="py-11">
      <div className="flex items-center ml-[39px] mr-7 mb-[23px]">
        <BackButton className="w-7 h-7 flex-shrink-0 mr-[39px]" />
        <h1 className="text-white heading-1-bold">{seminarTitle}</h1>
      </div>
      <div className="ml-[21.5px]">
        <AttendanceDetailList attendances={[]} />
      </div>
    </div>
  );
};

export default AttendanceDetail;
