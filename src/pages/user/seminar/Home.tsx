import { useNavigate } from 'react-router-dom';
import Header from '../../../components/common/Header';
import SeminarListCard from '../../../components/Seminar/SeminarListCard';
import SearchBar from '../../../components/common/SearchBar';
import { useQuery } from '@tanstack/react-query';
import { getSeminarList } from '../../../apis/seminarList';
import type { SeminarListResponse } from '../../../types/SeminarManage/seminarCard.api';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import { useState } from 'react';

const TAGS = [
  { id: 1, text: '태그1' },
  { id: 2, text: '태그2' },
  { id: 3, text: '태그3' },
];

function SeminarHome() {
  const navigate = useNavigate();
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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
      <div className="flex flex-col justify-center px-20 pt-64">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} tags={TAGS} />
        {isLoading && <LoadingSpinner />}
        <div className="flex flex-col items-center pt-7 ">
          {seminarList.map((seminar) => (
            <div
              key={seminar.seminarId}
              className="border-b-2 pb-6 border-[#E8EAEF]"
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
