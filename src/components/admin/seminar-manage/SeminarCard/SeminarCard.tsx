import { Link } from 'react-router-dom';
import { formatDate } from '../../../../utils/formatDate';
import type { SeminarCardData } from '../../../../types/SeminarManage/seminarCard.api';

interface SeminarCardProps {
  seminar: SeminarCardData;
}

const SeminarCard = ({ seminar }: SeminarCardProps) => {
  return (
    <Link to={`/admin/seminars/${seminar.seminarId}`}>
      <div className="bg-grey-700 max-w-[450px] rounded-lg p-3 cursor-pointer transition-colors border border-transparent hover:border-green-300 hover:bg-grey-600 duration-300">
        {/* 세미나 정보 */}
        <h2 className="heading-2-bold mb-1 text-center">{`제 ${seminar.seminarNum}회 Devtalk Seminar`}</h2>

        <div className="flex space-x-5">
          {/* 이미지 */}
          <div className="w-[220px] h-[160px] bg-grey-100 rounded-md my-auto overflow-hidden">
            {seminar.imageUrl ? (
              <img
                src={seminar.imageUrl}
                alt={`${seminar.seminarTopic}썸네일`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-grey-500 caption-semibold">
                No Image
              </div>
            )}
          </div>

          <div className="flex flex-col mt-[16px] flex-1 min-w-0">
            <div className="mb-[16px]">
              <p className="body-2-semibold mb-[8px] text-grey-300">일정</p>
              <div className="caption-semibold w-full verflow-hidden whitespace-nowrap text-ellipsis">
                {formatDate(seminar.seminarDate)}
              </div>
            </div>
            <div className="mb-[16px]">
              <p className="body-2-semibold mb-[8px] text-grey-300">장소</p>
              <div className="caption-semibold w-full overflow-hidden whitespace-nowrap text-ellipsis">
                {seminar.place}
              </div>
            </div>
            <div className="mb-[16px]">
              <p className="body-2-semibold mb-[8px] text-grey-300">주제</p>
              <div className="caption-semibold w-full overflow-hidden whitespace-nowrap text-ellipsis">
                {seminar.seminarTopic}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SeminarCard;
