import { useQuery } from '@tanstack/react-query';
import type { SeminarSessionResponse } from '../../types/SeminarDetail/seminarDetail';
import { getSeminarSession } from '../../apis/seminarDetail';

type LectureCardMainProps = {
  seminarId: number;
  index: number;
};

export const LectureCardSpeaker = ({ seminarId, index }: LectureCardMainProps) => {
  const { data } = useQuery<SeminarSessionResponse>({
    queryKey: ['seminarSession', seminarId],
    queryFn: () => getSeminarSession(seminarId),
  });

  const session = data?.result?.[index];
  const { speaker } = session || {};

  return (
    <div
      className="w-[311px] h-[500px] rounded-[12px] flex flex-col items-center justify-start p-6 flex-shrink-0 snap-center"
      style={{
        background:
          'linear-gradient(180deg, #090A0C 0%, rgba(9, 10, 12, 0.70) 100%), linear-gradient(90deg, #F2FFD5 0%, #B2CCFF 128.68%)',
      }}
    >
      {/* 프로필 이미지 */}
      <img
        src={speaker?.profileUrl}
        alt="연사 이미지"
        className="rounded-full w-[150px] h-[150px] object-cover mt-[26px] mb-[18px]"
      />

      {/* 연사 정보 */}
      <div className="flex flex-col items-center gap-[4px] text-center">
        <div className="flex items-center gap-8">
          <p className="subhead-1-semibold text-white">연사</p>
          <p className="heading-2-semibold text-gradient">{speaker?.name}</p>
          <p className="subhead-1-semibold text-white">님</p>
        </div>
        <p className="body-1-medium text-white">{speaker?.organization}</p>
      </div>

      {/* 경력 리스트 */}
      <ul className="pl-[16px] pt-[36px] w-[273px] body-2-medium text-grey-200 text-left list-disc pb-[8px]">
        {speaker?.history
          ?.split('-')
          .map((item) => item.trim())
          .filter(Boolean)
          .map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}{' '}
      </ul>
    </div>
  );
};
