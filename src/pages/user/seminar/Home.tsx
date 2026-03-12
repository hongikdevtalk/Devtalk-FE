import { useNavigate } from 'react-router-dom';
import Header from '../../../components/common/Header';
import SeminarListCard from '../../../components/Seminar/SeminarListCard';
import { useQuery } from '@tanstack/react-query';
import { getSeminarList } from '../../../apis/seminarList';
import type { SeminarListResponse } from '../../../types/SeminarManage/seminarCard.api';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import { useState } from 'react';

function SeminarHome() {
  const navigate = useNavigate();
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  const handleCardClick = (id: number) => {
    navigate(`/seminar/${id}`);
  };

  const { data, isLoading } = useQuery<SeminarListResponse>({
    queryKey: ['seminarList'],
    queryFn: getSeminarList,
  });

  const seminarList = data?.result?.seminarList || [];

  return (
    <div>
      <Header hamburgerOpen={hamburgerOpen} setHamburgerOpen={setHamburgerOpen} />
      <div className="flex flex-col justify-center gap-16 px-20 pt-16">
        {isLoading && <LoadingSpinner />}
        <div className="flex flex-col gap-24 items-center py-10 ">
          {seminarList.map((seminar) => (
            <div
              key={seminar.seminarId}
              className="border-t border-grey-700"
              onClick={() => handleCardClick(seminar.seminarId)}
            >
              <SeminarListCard seminar={seminar} />
            </div>
          ))}
        </div>
      </div>
      <div className="h-[24px]" />
    </div>
  );
}

export default SeminarHome;
