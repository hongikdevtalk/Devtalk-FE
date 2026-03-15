// home에서 carousel 중 신청 마감된 이전 카드들 - 연사 정보 포함됨

import { useNavigate } from 'react-router-dom';
import Tag from '../common/Tag';
import chevronright2 from '../../assets/icons/common/chevronright2.svg';

interface SeminarExProps {
  seminar: {
    seminarId: number;
    seminarNum: number;
    seminarTopic: string;
    summary: string;
    speakerNames: string | string[];
    imageUrl?: string;
    isClosed?: boolean;
  };
}

export const SeminarExCard = ({ seminar }: SeminarExProps) => {
  const {
    seminarId,
    seminarNum,
    seminarTopic,
    summary,
    speakerNames,
    imageUrl,
    isClosed = false,
  } = seminar;

  const navigate = useNavigate();
  const speakers = Array.isArray(speakerNames) ? speakerNames : [speakerNames];
  return (
    <div className="w-[302px] h-[346px] bg-background shadow-[0px_6px_16px_rgba(0,0,0,0.15)] overflow-hidden rounded-[5px] flex flex-col items-center flex-shrink-0">
      <div className="w-[302px] h-[171px] flex justify-center items-center relative flex-shrink-0">
        {/* 상단 영역 - 이미지, 태그, 신청 마감 */}
        <img src={imageUrl} alt={seminarTopic} className="w-full h-full object-cover" />
        {isClosed && (
          <div className="absolute inset-0 flex justify-center items-center">
            <span className="text-grey-700 subhead-1-semibold">신청마감</span>
          </div>
        )}
      </div>
      <div className="w-full flex-1 p-16 flex flex-col justify-start items-start gap-3">
        <Tag>{seminarNum}회차</Tag>

        {/* 하단 영역 - 제목, 연사, 요약(아직 구현X, 26.02.28)*/}
        <div
          className="w-full flex justify-between items-center gap-16"
          onClick={() => navigate(`/seminar/${seminarId}`)}
        >
          <h3 className="text-black heading-3-semibold leading-tight">{seminarTopic}</h3>
          <div className="w-6 h-6 flex items-center justify-center relative overflow-hidden">
            <img
              src={chevronright2}
              alt="chevronright2"
              className="w-[119.06px] h-[24px] cursor-pointer"
            />
          </div>
        </div>
        <div className="gap-1">
          {/* 강연 내용 요약 -> 아직 없음 => 세미나 제목으로 설정해놓음 */}
          <p className="w-full text-black body-1-light text-[16px]">{summary}</p>
        </div>
        {/* 연사 정보 */}
        <div className="flex flex-col gap-1 w-full">
          <div className="flex items-center gap-3 w-full overflow-hidden">
            <span className="w-[35px] flex-shrink-0 text-black subhead-1-regular leading-tight">
              연사
            </span>
            <div className="flex flex-col gap-1 flex-1">
              {speakers.map((name, index) => (
                <span key={index} className="text-black subhead-light leading-tight break-keep">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
