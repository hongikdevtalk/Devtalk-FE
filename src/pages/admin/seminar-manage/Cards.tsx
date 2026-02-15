import { Link } from 'react-router-dom';
import SeminarCard from '../../../components/admin/seminar-manage/SeminarCard/SeminarCard';
import { useSeminarCards } from '../../../hooks/SeminarManage/data/useSeminarCards';
import LoadingSpinner from '../../../components/common/LoadingSpinner';

const Cards = () => {
  const { data: seminarData, isLoading, isError } = useSeminarCards();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="text-status-error text-center p-20">데이터를 불러오는 데 실패했습니다.</div>
    );
  }

  const seminars = seminarData?.result?.seminarList || [];

  return (
    <div className="min-w-[960px] max-w-[1010px] py-60 px-60">
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-40">
        <h1 className="heading-1-bold text-white">세미나 카드 조회</h1>
        <Link className="heading-3-semibold text-green-300 cursor-pointer" to="/admin/seminars/add">
          추가하기
        </Link>
      </div>

      {/* 세미나 카드 */}
      <div className="grid grid-cols-2 gap-[25px]">
        {seminars.map((seminar) => (
          <SeminarCard key={seminar.seminarNum} seminar={seminar} />
        ))}
      </div>
    </div>
  );
};

export default Cards;
