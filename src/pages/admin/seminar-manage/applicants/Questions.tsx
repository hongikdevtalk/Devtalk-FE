import { useParams } from 'react-router-dom';
import ApplicantsQuestionList from './../../../../components/admin/applicants/ApplicantsQuestionList';
import BackButton from './../../../../components/Button/BackButton';
import ExcelDownloadButton from './../../../../components/Button/ExcelDownloadButton';
import { useSeminarQuestions } from '../../../../hooks/Applicants/useSeminarQuestions';

const Questions = () => {
  const { id } = useParams<{ id: string }>();
  const { data: questionsData } = useSeminarQuestions(id!);

  // API 응답 데이터를 컴포넌트에서 사용하는 형식으로 변환
  const speakers = questionsData?.result?.speakers || [];
  const applicants =
    questionsData?.result?.students?.map((student, index) => {
      const question1 = student.questions.find((q) => q.speakerId === speakers[0]?.speakerId);
      const question2 = student.questions.find((q) => q.speakerId === speakers[1]?.speakerId);

      return {
        id: index + 1,
        studentId: student.studentNum,
        name: student.studentName,
        contact: student.phoneNum,
        question1: question1?.content || '',
        question2: question2?.content || '',
      };
    }) || [];

  const speakersInfo = {
    speaker1: speakers[0]?.speakerName || '첫번째 연사',
    speaker2: speakers[1]?.speakerName || '두번째 연사',
  };

  const seminarTitle = `제 ${questionsData?.result?.seminarNum}회 Devtalk Seminar`;

  // 엑셀 다운로드용 헤더 매핑
  const excelHeaders = {
    studentId: '학번',
    name: '이름',
    contact: '연락처',
    question1: `[${speakersInfo.speaker1}]님께 궁금한 점이나 듣고 싶은 이야기가 있나요?`,
    question2: `[${speakersInfo.speaker2}]님께 궁금한 점이나 듣고 싶은 이야기가 있나요?`,
  };

  return (
    <div className="py-11">
      <div className="flex items-center justify-between ml-[39px] mr-7 mb-[23px]">
        <div className="flex items-center">
          <BackButton className="w-7 h-7 flex-shrink-0 mr-[39px]" />
          <h1 className="text-white heading-1-bold">{seminarTitle}-연사별 질문</h1>
        </div>
        <ExcelDownloadButton
          data={applicants}
          fileName={`${seminarTitle}_연사별_질문.xlsx`}
          className="subhead-1-semibold"
          headers={excelHeaders}
        />
      </div>
      <div className="ml-[21.5px]">
        <ApplicantsQuestionList applicants={applicants} speakers={speakersInfo} />
      </div>
    </div>
  );
};

export default Questions;
