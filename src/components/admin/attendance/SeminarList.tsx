import { useNavigate } from 'react-router-dom';
import { useSeminarNums } from '../../../hooks/Applicants/useSeminarNums';
import QrGenerateButton from './QrGenerateButton';

// 세미나 데이터 타입 정의
interface SeminarData {
  seminarId: number;
  seminarNum: number;
}

const ApplicantsList = () => {
  const navigate = useNavigate();
  const { data: seminarNumsData } = useSeminarNums();

  // API 응답에서 세미나 정보 추출 및 내림차순 정렬
  const seminars: SeminarData[] =
    seminarNumsData?.result
      ?.map((item) => ({ seminarId: item.seminarId, seminarNum: item.seminarNum }))
      .sort((a, b) => b.seminarNum - a.seminarNum) || [];

  // 세미나 제목 생성 함수
  const getSeminarTitle = (seminarNum: number) => `제 ${seminarNum}회 Devtalk 세미나 출석부`;

  return (
    <div className="space-y-0">
      {seminars.map((seminar, index) => (
        <div key={seminar.seminarId}>
          {/* 세미나 제목 */}
          <div className="cursor-pointer py-20 flex items-center justify-between" onClick={() => navigate(`/admin/seminars/applicants/${seminar.seminarId}/attendance`)}>
            <h3 className="text-white heading-2-semibold">{getSeminarTitle(seminar.seminarNum)}</h3>
            <QrGenerateButton seminarId={seminar.seminarId} />
          </div>

          {/* 세미나 사이 구분선 */}
          {index < seminars.length && (
            <div className="w-full h-0 flex-shrink-0 border-b-[1.5px] border-white"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ApplicantsList;
