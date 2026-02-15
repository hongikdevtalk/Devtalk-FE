import { useQuery } from '@tanstack/react-query';
import type { SeminarSessionResponse } from '../../types/SeminarDetail/seminarDetail';
import { getSeminarSession } from '../../apis/seminarDetail';

const SeminarDetailLectureCard = ({ seminarId, index }: { seminarId: number; index: number }) => {
  const { data, isLoading } = useQuery<SeminarSessionResponse>({
    queryKey: ['seminarSession', seminarId],
    queryFn: () => getSeminarSession(seminarId),
  });

  const session = data?.result?.[index];
  const { title, description, speaker } = session || {};

  // %~% 텍스트 <span>으로 변환
  const highlightDescription = (text: string) => {
    return text.replace(/%([^%]+)%/g, `<span class="text-gradient">$1</span>`);
  };

  return session ? (
    <div className="relative w-[335px] h-[1033px] rounded-[12px] overflow-hidden flex flex-col items-center justify-start bg-black">
      {isLoading && <div>Loading...</div>}

      <div className="relative w-[335px] overflow-hidden">
        <img
          src={speaker?.profileUrl}
          alt="연사 이미지"
          className="w-full h-[427px] object-cover block"
        />
        <div className="absolute inset-0 h-[430px] image-gradient" />
        <div className="w-full h-[606px] -mt-[2px] bottom-gradient" />
      </div>

      <div className="flex flex-col w-[295px] gap-[20px] items-center absolute top-[300px] z-10 ">
        <div className="flex flex-col gap-4 justify-center items-center">
          <div className="flex gap-[8px] items-center body-2-semibold text-white ">
            연사 <span className="subhead-1-semibold text-gradient">{speaker?.name}</span>님
          </div>
          <p className="body-1-medium text-white">{speaker?.organization}</p>
        </div>
        <ul className="w-[273px] h-[140px] pl-5 body-2-medium text-grey-200 list-disc list-outside">
          {speaker?.history
            ?.split('-')
            .map((item) => item.trim())
            .filter(Boolean)
            .map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
        </ul>
      </div>
      <div className="absolute bottom-[52px] h-[332px] w-[295px] flex flex-col gap-[39px] items-center justify-center">
        <div className="w-[237px] h-[93px] flex flex-col gap-[9px] justify-center items-center heading-3-semibold">
          <div className="text-gradient">Session #{index + 1}</div>
          <div className="text-white text-center break-keep-all">{title}</div>
        </div>
        <div
          className="w-[295px] body-2-medium text-grey-200 text-left whitespace-pre-line"
          dangerouslySetInnerHTML={{ __html: highlightDescription(description ?? '') }}
        />
      </div>
    </div>
  ) : null;
};

export default SeminarDetailLectureCard;
