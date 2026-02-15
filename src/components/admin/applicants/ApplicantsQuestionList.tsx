interface Applicant {
  id: number;
  studentId: string;
  name: string;
  contact: string;
  question1: string;
  question2: string;
}

interface ApplicantsQuestionListProps {
  applicants: Applicant[];
  speakers?: {
    speaker1: string;
    speaker2: string;
  };
}

const ApplicantsQuestionList: React.FC<ApplicantsQuestionListProps> = ({
  applicants,
  speakers,
}) => {
  const headerStyle = 'border border-grey-400 px-5 py-3 text-center subhead-1-semibold text-white';

  const cellStyle = 'border border-grey-400 px-5 py-3 text-center body-1-semibold text-white ';

  //px-5 여백에 맞춰 자동 줄바꿈
  const questionCellStyle =
    'border border-grey-400 px-5 py-3 text-left body-1-semibold text-white max-w-sm break-words whitespace-normal leading-relaxed';

  const headers = [
    '학번',
    '이름',
    '연락처',
    `[${speakers?.speaker1 || '첫번째 연사'}]님께 궁금한 점이나 듣고 싶은 이야기가 있나요?`,
    `[${speakers?.speaker2 || '두번째 연사'}]님께 궁금한 점이나 듣고 싶은 이야기가 있나요?`,
  ];

  const dataKeys = ['studentId', 'name', 'contact', 'question1', 'question2'] as const;

  return (
    <div className="w-full">
      <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-150px)]">
        <table className="min-w-max border-collapse">
          <thead>
            <tr className="bg-grey-900">
              {headers.map((header) => (
                <th key={header} className={headerStyle}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {applicants.map((applicant) => (
              <tr
                key={applicant.id}
                className="bg-grey-700 hover:ring-2 hover:ring-green-300 hover:ring-inset cursor-pointer"
              >
                {dataKeys.map((key) => (
                  <td
                    key={key}
                    className={
                      key === 'question1' || key === 'question2' ? questionCellStyle : cellStyle
                    }
                  >
                    {applicant[key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {applicants.length === 0 && (
        <div className="text-center py-8 text-white subhead-1-medium">
          질문이 존재하지 않습니다.
        </div>
      )}
    </div>
  );
};

export default ApplicantsQuestionList;
