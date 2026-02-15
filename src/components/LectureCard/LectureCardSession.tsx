import { useQuery } from '@tanstack/react-query';
import type { SeminarSessionResponse } from '../../types/SeminarDetail/seminarDetail';
import { getSeminarSession } from '../../apis/seminarDetail';

type LectureCardMainProps = {
  seminarId: number;
  index: number;
};

export const LectureCardSession = ({ seminarId, index }: LectureCardMainProps) => {
  const { data } = useQuery<SeminarSessionResponse>({
    queryKey: ['seminarSession', seminarId],
    queryFn: () => getSeminarSession(seminarId),
  });

  const session = data?.result?.[index];
  const { title, description } = session || {};

  // %~% 텍스트 <span>으로 변환
  const highlightDescription = (text: string) => {
    return text.replace(/%([^%]+)%/g, `<span class="text-gradient">$1</span>`);
  };

  return (
    <div
      className="w-[311px] h-[500px] rounded-12 flex flex-col items-center justify-start px-[28px] pt-[50px] pb-[32px] gap-[48px] flex-shrink-0 snap-center"
      style={{
        background:
          'linear-gradient(180deg, #090A0C 0%, rgba(9, 10, 12, 0.70) 100%), linear-gradient(90deg, #F2FFD5 0%, #B2CCFF 128.68%)',
      }}
    >
      {/* 타이틀 */}
      <div className="flex flex-col items-center text-center w-[237px] h-[92px] gap-[8px]">
        <p className="heading-3-semibold text-gradient">Session #{index + 1}</p>
        <p className="heading-3-semibold text-white">{title}</p>
      </div>

      {/* 세션 내용 */}
      <div
        className="body-2-medium text-grey-200 text-left whitespace-pre-line"
        dangerouslySetInnerHTML={{ __html: highlightDescription(description ?? '') }}
      />
    </div>
  );
};
