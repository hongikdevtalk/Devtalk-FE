import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSeminarNums } from '../../../hooks/Applicants/useSeminarNums';

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
  const getSeminarTitle = (seminarNum: number) => `제 ${seminarNum}회 Devtalk Seminar`;

  // 현재 펼쳐진 세미나 번호를 관리
  const [expandedSeminarNum, setExpandedSeminarNum] = useState<number | null>(null);

  // 세미나 항목 클릭 시 펼침/접힘 처리
  const toggleExpanded = (seminarNum: number) => {
    setExpandedSeminarNum(expandedSeminarNum === seminarNum ? null : seminarNum);
  };

  // 신청자 개인정보 페이지로 이동
  const handlePersonalInfo = (seminarId: number) => {
    navigate(`/admin/seminars/applicants/${seminarId}`);
  };

  // 연사별 질문 페이지로 이동
  const handleQuestions = (seminarId: number) => {
    navigate(`/admin/seminars/applicants/${seminarId}/questions`);
  };

  return (
    <div className="space-y-0">
      {seminars.map((seminar, index) => (
        <div key={seminar.seminarId}>
          {/* 세미나 제목 */}
          <div className="cursor-pointer py-20" onClick={() => toggleExpanded(seminar.seminarNum)}>
            <h3 className="text-white heading-2-semibold">{getSeminarTitle(seminar.seminarNum)}</h3>
          </div>

          {/* 펼쳐진 상태일 때 하위 메뉴 표시 */}
          {expandedSeminarNum === seminar.seminarNum && (
            <div>
              {/* 신청자 개인정보 */}
              <div
                className="flex items-center cursor-pointer text-gray-500 subhead-1-medium hover:opacity-70"
                onClick={() => handlePersonalInfo(seminar.seminarId)}
              >
                <span className="mr-4">•</span>
                <span>신청자 개인정보</span>
              </div>

              <div className="mt-[20px]">
                {/* 연사별 질문 */}
                <div
                  className="flex items-center cursor-pointer text-gray-500 subhead-1-medium hover:opacity-70"
                  onClick={() => handleQuestions(seminar.seminarId)}
                >
                  <span className="mr-4">•</span>
                  <span>연사별 질문</span>
                </div>
              </div>
              <div className="mb-[18px]"></div>
            </div>
          )}

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
