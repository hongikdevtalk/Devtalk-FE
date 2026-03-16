import { useQuery } from '@tanstack/react-query';
import type { SeminarSessionResponse } from '../../types/SeminarDetail/seminarDetail';
import { getSeminarSession } from '../../apis/seminarDetail';
import SessionTagList from './SessionTagList';
import Header from '../common/Header';
import { useState } from 'react';
import { Chip } from '../Chip/Chip';

const SeminarDetailSpeakerCard = ({
  seminarId,
  seminarNum,
  index,
}: {
  seminarId: number;
  seminarNum: number;
  index: number;
}) => {
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

  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  return session ? (
    <div id={speaker?.name} className="w-[384px] flex flex-col items-center">
      {isLoading && <div>Loading...</div>}
      <Header hamburgerOpen={hamburgerOpen} setHamburgerOpen={setHamburgerOpen} />
      <div className="w-full px-9 pt-60 flex flex-col justify-center items-center overflow-hidden">
        <img
          src={speaker?.profileUrl}
          alt="연사 이미지"
          className="w-[308px] h-[355px] object-cover rounded-[12px]"
          style={{ aspectRatio: '147/169' }}
        />
      </div>
      <div className="flex flex-col w-full gap-[20px] items-start px-5 py-[30px]">
        <div className="flex flex-col gap-4">
          <Chip text={`${seminarNum}회차 세미나`} />
          <div className="flex gap-0 items-center mt-4">
            <span className="subhead-1-medium text-black text-center">{speaker?.name}</span>
            <span className="subhead-1-regular text-black"> 님</span>
          </div>
          <div>
            <p className="body-1-medium text-grey-700">{speaker?.organization}</p>
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
        </div>

        <div className="h-0.5 bg-grey-400 w-full" />

        <div className="flex flex-col justify-center items-center pt-5 pb-10 px-5">
          <div className="session-title">Session #{index + 1}</div>
          <div className="w-full py-10">
            <SessionTagList
              tags={
                keywords && keywords.length > 0 ? keywords.slice(0, 3) : ['태그1', '태그2', '태그3']
              }
            />
          </div>
          <div className="w-full flex flex-col gap-[39px] items-center">
            <div className="w-full flex flex-col gap-[9px] justify-center items-center heading-3-semibold">
              <div className="subhead-1-regular text-black text-center break-keep-all">
                {index + 1}부 {title}
              </div>
            </div>
            <div
              className="w-full body-1-light text-black text-left whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: highlightDescription(description ?? '') }}
            />
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default SeminarDetailSpeakerCard;
