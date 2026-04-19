// 햄버거 바 검색 시 나오는 결과 아이템들 - 세미나 정보 카드 및 연사 정보

import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils/formatDate';
import { Chip } from '../Chip/Chip';

interface SearchResultItemProps {
  result: {
    seminarId: number;
    seminarTopic: string;
    seminarNum: number;
    seminarDate: string;
    place: string;
    description?: string;
    imageUrl?: string;
  };
  onClose: () => void;
}

const SearchResultItem = ({ result, onClose }: SearchResultItemProps) => {
  const navigate = useNavigate();
  const { seminarId, seminarNum, seminarTopic, seminarDate, place, description, imageUrl } = result;

  const handleNavigate = () => {
    onClose();
    navigate(`/seminar/${seminarId}`);
  };

  return (
    <div className="flex flex-col">
      {/* 상단 영역 - 세미나 요약 카드 */}
      <div className="px-5 pt-5 pb-6 flex flex-col gap-4 cursor-pointer" onClick={handleNavigate}>
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-0.5">
            <h3 className="text-black heading-3-medium">{seminarTopic}</h3>
          </div>
          <Chip text={`${seminarNum}회차`} />
        </div>
        <p className="text-grey-700 body-1-light text-[16px]">
          {description || '세미나 설명이 없습니다.'}
        </p>

        <div className="flex justify-start items-start mt-[16px] gap-16">
          <img
            className="w-[150px] h-[106px] rounded-[5px] object-cover shrink-0"
            src={imageUrl}
            alt="seminar"
          />
          <div className="py-2 flex flex-col gap-8">
            <div className="flex items-center gap-8.5">
              <span className="w-8 flex-shrink-0 whitespace-nowrap text-black subhead-1-medium">
                일정
              </span>
              <span className="text-black subhead-light leading-tight">
                {formatDate(seminarDate)}
              </span>
            </div>
            <div className="flex items-center gap-8.5">
              <span className="w-8 flex-shrink-0 whitespace-nowrap text-black subhead-1-medium">
                장소
              </span>
              <span className="text-black subhead-light leading-tight">{place}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultItem;
