import { useQuery } from '@tanstack/react-query';
import type { SeminarSessionResponse } from '../../types/SeminarDetail/seminarDetail';
import { getSeminarSession } from '../../apis/seminarDetail';
import rightarrow from '../../assets/icons/common/rightarrow.svg';
import SessionTagList from './SessionTagList';

const SeminarDetailLectureCard = ({ seminarId, index }: { seminarId: number; index: number }) => {
  const { data, isLoading } = useQuery<SeminarSessionResponse>({
    queryKey: ['seminarSession', seminarId],
    queryFn: () => getSeminarSession(seminarId),
  });

  const session = data?.result?.[index];

  const { title, description, speaker, keywords } = session || {};

  // %~% 텍스트 <span>으로 변환
  const highlightDescription = (text: string) => {
    return text.replace(/%([^%]+)%/g, `<span class="text-highlight">$1</span>`);
  };

  return session ? (
    <div
      id={speaker?.name}
      className="w-[335px] flex flex-col items-center gap-20"
    >
      {isLoading && <div>Loading...</div>}

      <div className="session-title">Session #{index + 1}</div>
      <img
        src={speaker?.profileUrl}
        alt="연사 이미지"
        className="w-[314px] h-[361px] object-cover rounded-[12px]"
        style={{ aspectRatio: '147/169' }}
      />

      <div className="flex flex-col w-[295px] gap-[20px] items-center">
        <div className="flex flex-col gap-4 justify-center items-center">
          <p className="organization-tag">{speaker?.organization}</p>
          <div className="flex gap-0 items-center mt-4">
            <span className="subhead-1-medium text-black text-center">{speaker?.name}</span>
            <span className="subhead-1-regular text-black"> 님</span>
            <img src={rightarrow} alt="right arrow" />
          </div>
        </div>
        <ul className="w-[273px] pl-5 body-2-regular text-grey-700 list-disc list-outside">
          {speaker?.history
            ?.split('-')
            .map((item) => item.trim())
            .filter(Boolean)
            .map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
        </ul>
        <div className="mt-16 w-full">
          <SessionTagList tags={keywords && keywords.length > 0 ? keywords.slice(0, 3) : ['태그1', '태그2', '태그3']} />
        </div>
        <div className="w-[295px] flex flex-col gap-[39px] items-center">
          <div className="w-[237px] flex flex-col gap-[9px] justify-center items-center heading-3-semibold">
            
            <div className="subhead-1-regular text-black text-center break-keep-all">{index + 1}부 {title}</div>
          </div>
          <div
            className="w-[295px] body-1-light text-black text-left whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: highlightDescription(description ?? '') }}
          />
        </div>
      </div>
    </div>
  ) : null;
};

export default SeminarDetailLectureCard;
