// 햄버거 바 검색 시 나오는 결과 아이템들 - 세미나 정보 카드 및 연사 정보

import { useNavigate } from 'react-router-dom';
import Tag from '../common/Tag';
import { formatDate } from '../../utils/formatDate';

interface SearchResultItemProps {
  result: {
    seminarId: number;
    seminarTopic: string;
    seminarNum: number;
    seminarDate: string;
    place: string;
    imageUrl?: string;
    speakerNames: string[];
    subTitles: string[];
    speakerImageUrl: string;
  };
  onClose: () => void;
}

const SearchResultItem = ({ result, onClose }: SearchResultItemProps) => {
  const navigate = useNavigate();
  const {
    seminarId,
    seminarNum,
    seminarTopic,
    speakerNames,
    seminarDate,
    place,
    subTitles,
    imageUrl,
    speakerImageUrl,
  } = result;

  const handleNavigate = () => {
    onClose();
    navigate(`/seminar/${seminarId}`);
    window.location.reload();
  };

  return (
    <div className="flex flex-col">
      {/* 상단 영역 - 세미나 요약 카드 */}
      <div className="px-5 pt-5 pb-6 flex flex-col gap-4 cursor-pointer" onClick={handleNavigate}>
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-0.5">
            <h3 className="text-black text-xl font-medium font-['Pretendard']">{seminarTopic}</h3>
          </div>
          <Tag>{seminarNum}회차</Tag>
        </div>
        {/* 요약본이 아직 없음 */}
        {/* <p className="text-grey-700 text-base font-light font-['Pretendard'] leading-5 text-[16px]">
          강연 주제를 한 줄로 요약하여 적어주세요.
        </p> */}

        <div className="flex justify-start items-start mt-[16px] gap-16">
          <img
            className="w-[162px] h-[98px] rounded-[5px] object-cover shrink-0"
            src={imageUrl}
            alt="seminar"
          />
          <div className="py-2 flex flex-col gap-2.5">
            <div className="flex items-center gap-8.5">
              <span className="w-8 flex-shrink-0 whitespace-nowrap text-black text-lg font-medium font-['Pretendard']">
                일정
              </span>
              <span className="text-black text-lg font-light font-['Pretendard'] leading-tight">
                {formatDate(seminarDate)}
              </span>
            </div>
            <div className="flex items-center gap-8.5">
              <span className="w-8 flex-shrink-0 whitespace-nowrap text-black text-lg font-medium font-['Pretendard']">
                장소
              </span>
              <span className="text-black text-lg font-light font-['Pretendard'] leading-tight">
                {place}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="h-0.5 bg-grey-400 w-full" />

      {/* 하단 영역 - 연사 정보 카드 */}
      <div className="px-5 pt-5 pb-6 flex gap-16 items-start" onClick={handleNavigate}>
        <img
          className="w-[130px] h-[164px] rounded-[5px] object-cover shrink-0"
          src={speakerImageUrl}
          alt="speaker"
        />
        <div className="flex-1 py-2 flex flex-col gap-6">
          {' '}
          {speakerNames.map((name, index) => (
            <div key={index} className="flex flex-col gap-2">
              {' '}
              <div className="flex justify-between items-center">
                <div className="text-black text-xl font-medium font-['Pretendard']">{name}</div>
                {index === 0 && <Tag>{seminarNum}회차</Tag>}
              </div>
              <div className="text-black text-lg font-normal font-['Pretendard'] whitespace-pre-line leading-tight">
                {subTitles[index]}
              </div>
              {index < speakerNames.length - 1 && (
                <div className="h-[1px] bg-grey-200 w-full mt-2" />
              )}
            </div>
          ))}
        </div>
        {/* <div className="text-zinc-500 text-base font-light font-['Pretendard'] leading-5">
            강연 주제를 한 줄로 요약하여 적어주세요.
          </div> */}
      </div>
      <div className="h-0.5 bg-grey-400 w-full" />
    </div>
  );
};

export default SearchResultItem;
