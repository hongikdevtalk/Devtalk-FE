import { useQuery } from '@tanstack/react-query';
import type { SeminarSessionResponse } from '../../types/SeminarDetail/seminarDetail';
import { getSeminarSession } from '../../apis/seminarDetail';
import speakerEx from '../../assets/images/speakerEx.jpg';

type LectureCardMainProps = {
  seminarId: number;
  index: number;
};

export const LectureCardMain = ({ seminarId, index }: LectureCardMainProps) => {
  const { data } = useQuery<SeminarSessionResponse>({
    queryKey: ['seminarSession', seminarId],
    queryFn: () => getSeminarSession(seminarId),
  });

  const session = data?.result?.[index];
  const { title, speaker } = session || {};

  return (
    <div className="relative w-[311px] h-[500px] rounded-[12px] overflow-hidden bg-black flex-shrink-0 snap-center">
      {/* 프로필 이미지 */}
      <img
        src={speaker?.profileUrl || speakerEx}
        alt="연사 이미지"
        className="w-full h-full object-cover"
      />

      {/* 그라데이션 */}
      <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-[#3A4140] via-[#090A0C] to-transparent" />

      {/* 텍스트 정보 */}
      <div className="absolute bottom-[35px] p-[16px] text-center gap-[20px] flex flex-col w-full">
        <div className="flex flex-col gap-4">
          <div className="flex gap-[8px] items-center justify-center">
            <span className="body-2-semibold text-white">연사</span>
            <div className="flex items-center justify-center gap-4">
              <span className="subhead-1-semibold text-gradient">
                {speaker?.name || '연사님 이름'}
              </span>
              <span className="body-2-semibold text-white">님</span>
            </div>
          </div>
          <p className="body-1-medium text-white">{speaker?.organization || '소속 정보 없음'}</p>
        </div>
        <p className="px-[20px] heading-3-semibold text-white text-balance">
          {title || '세션 정보 없음'}
        </p>
      </div>
    </div>
  );
};
