// home에서 carousel 중 현재 세미나 카드

import { useNavigate } from 'react-router-dom';
import Tag from '../common/Tag';
import chevronright2 from '../../assets/icons/common/chevronright2.svg';
import dev from '../../assets/logos/dev.svg';
import { formatDate } from '../../utils/formatDate';

interface SeminarInfoCardProps {
  seminar: {
    seminarId: number;
    seminarNum: number;
    seminarTopic: string;
    seminarDate: string;
    place: string;
    imageUrl?: string;
    isClosed?: boolean;
  };
}
export const SeminarInfoCard = ({ seminar }: SeminarInfoCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="w-[302px] h-[346px] shadow-[0px_6px_16px_0px_rgba(0,0,0,0.15)] bg-background overflow-hidden rounded-[5px] flex flex-col items-center flex-shrink-0">
      <div className="w-[302px] h-[171px] flex justify-center items-center relative flex-shrink-0">
        {/* 상단 영역 - 이미지, 태그 등 */}
        <img
          src={seminar.imageUrl || dev}
          alt={seminar.seminarTopic}
          className="w-full h-full object-cover"
        />
        {seminar.isClosed && (
          <span className="text-white text-[18px] font-semibold font-['Pretendard']">신청마감</span>
        )}
      </div>
      <div className="w-full flex-1 p-16 flex flex-col justify-start items-start gap-3">
        <Tag>{seminar.seminarNum}회차</Tag>

        {/* 하단 영역 - 제목, 일정, 장소 등 */}
        <div
          className="w-full flex justify-between items-center mb-1 gap-16 cursor-pointer"
          onClick={() => navigate(`/seminar/${seminar.seminarId}`)}
        >
          <h3 className="text-black text-[20px] font-semibold font-['Pretendard'] leading-tight">
            {seminar.seminarTopic}
          </h3>
          <div className="w-6 h-6 flex items-center justify-center">
            <img
              src={chevronright2}
              alt="chevronright2"
              className="w-[119.06px] h-[24px] cursor-pointer"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <div className="flex items-start gap-3 w-full overflow-hidden">
            <span className="w-[35px] flex-shrink-0 text-black text-[18px] font-normal font-['Pretendard'] leading-tight">
              일정
            </span>
            <span className="flex-1 text-black text-[18px] font-[200] font-['Pretendard'] leading-tight break-keep">
              {formatDate(seminar.seminarDate)}
            </span>
          </div>
          <div className="flex items-start gap-3 w-full overflow-hidden">
            <span className="w-[35px] flex-shrink-0 text-black text-[18px] font-normal font-['Pretendard'] leading-tight">
              장소
            </span>
            <span className="flex-1 text-black text-[18px] font-[200] font-['Pretendard'] leading-tight break-keep">
              {seminar.place}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
