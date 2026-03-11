// 햄버거 바 검색 시 나오는 결과 아이템들 - 연사 카드

import { useNavigate } from 'react-router-dom';
import Tag from '../common/Tag';

interface SearchResultSpeakerProps {
  result: {
    seminarId: number;
    seminarNum: number;
    speakerNames: string[];
    subTitles: string[];
    speakerImageUrl: string | string[];
  };
  onClose: () => void;
}

const SearchResultSpeaker = ({ result, onClose }: SearchResultSpeakerProps) => {
  const navigate = useNavigate();
  const { seminarId, seminarNum, speakerNames, subTitles, speakerImageUrl } = result;

  const handleNavigate = (name: string) => {
    onClose();
    navigate(`/seminar/${seminarId}?speaker=${encodeURIComponent(name)}`);
    1;
  };

  return (
    <div className="flex flex-col">
      {/* 하단 영역 - 연사 정보 카드 */}
      {speakerNames.map((name, index) => (
        <div
          key={index}
          className="flex flex-col cursor-pointer"
          onClick={() => handleNavigate(name)}
        >
          <div className="h-0.5 bg-grey-400 w-full" />

          <div className="flex px-5 pt-5 pb-6 gap-6 items-start">
            <img
              className="w-[130px] h-[164px] rounded-[5px] object-cover shrink-0"
              src={Array.isArray(speakerImageUrl) ? speakerImageUrl[index] : speakerImageUrl}
              alt={`${name} speaker`}
            />

            <div className="flex flex-col flex-1 py-2 gap-2.5">
              <div className="self-stretch flex justify-between items-center">
                <div className="text-black text-xl font-medium font-['Pretendard']">{name}</div>
                <Tag>{seminarNum}회차</Tag>
              </div>

              <div className="text-black text-lg font-normal font-['Pretendard'] whitespace-pre-line leading-tight">
                {subTitles[index]}
              </div>

              <div className="text-grey-700 text-base font-light font-['Pretendard'] leading-5">
                강연 주제를 한 줄로 요약하여 적어주세요.
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="h-0.5 bg-grey-400 w-full" />
    </div>
  );
};

export default SearchResultSpeaker;
