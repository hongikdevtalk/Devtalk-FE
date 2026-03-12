import type { SeminarCardData } from '../../types/SeminarManage/seminarCard.api';
import { Chip } from '../Chip/Chip';

interface SeminarItem {
  seminar: SeminarCardData;
}

const SeminarListCard = ({ seminar }: SeminarItem) => {
  const { seminarNum, seminarTopic, seminarDate, place, imageUrl } = seminar;
  const d = new Date(seminarDate.replace(/\./g, '-').replace(' ', 'T'));
  const date = `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
  const time = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;

  return (
    <div className="w-[335px] pt-20 gap-[20px] flex flex-col cursor-pointer">
      <div className="flex flex-col gap-[4px]">
        <div className="flex flex-row items-center justify-between">
          <div className="heading-3-medium text-black whitespace-pre-line">{seminarTopic}</div>
          <Chip text={`${seminarNum}회차`} className="whitespace-nowrap" />
        </div>
        <div className="body-1-light" style={{ color: '#7B7E84' }}>강연 주제를 한 줄로 요약하여 적어주세요.</div>
      </div>
      <div className="h-[106px] flex flex-row gap-16">
        <img
          src={imageUrl}
          alt="seminar Img"
          className="w-[150px] h-[106px] rounded-8 object-cover"
        />
        <div className="h-[68px] flex flex-col gap-8 justify-between text-black">
          <div className="flex flex-row gap-12 align-start">
            <div className="subhead-medium whitespace-nowrap">일정</div>
            <div className="subhead-light whitespace-nowrap">{date} {time}</div>
          </div>
          <div className="flex flex-row gap-12 align-start">
            <div className="subhead-medium">장소</div>
            <div className="subhead-light">{place}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeminarListCard;
