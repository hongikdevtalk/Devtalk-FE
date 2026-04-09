import { useNavigate } from 'react-router-dom';
import Header from '../../../components/common/Header';
import SeminarListCard from '../../../components/Seminar/SeminarListCard';
import SearchBar from '../../../components/common/SearchBar';
import { useQuery, useQueries } from '@tanstack/react-query';
import { getSeminarList } from '../../../apis/seminarList';
import type { SeminarListResponse } from '../../../types/SeminarManage/seminarCard.api';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import { useState } from 'react';
import { getSeminarSession } from '../../../apis/seminarDetail';
import { getPopularTags } from '../../../apis/popularTag';

function SeminarHome() {
  const navigate = useNavigate();
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const { data: popularTagsData } = useQuery({
    queryKey: ['popularTags'],
    queryFn: getPopularTags,
    staleTime: 1000 * 60 * 10,
  });

  const tags = [
    ...(popularTagsData?.result?.map((tag: string, index: number) => ({
      id: index + 1,
      text: tag,
    })) || []),
  ];

  const { data, isLoading: isListLoading } = useQuery<SeminarListResponse>({
    queryKey: ['seminarList'],
    queryFn: getSeminarList,
  });

  const handleCardClick = (id: number) => {
    navigate(`/seminar/${id}`);
  };

  const seminarList = data?.result?.seminarList || [];

  const detailQueries = useQueries({
    queries: seminarList.map((seminar) => ({
      queryKey: ['seminarSession', seminar.seminarId],
      queryFn: () => getSeminarSession(seminar.seminarId),
      staleTime: 1000 * 60 * 5,
    })),
  });

  const combinedSeminarList = seminarList.map((seminar, index) => {
    const detailData = detailQueries[index]?.data;
    const sessions = Array.isArray(detailData?.result) ? detailData.result : [];

    return {
      ...seminar,
      speakerNames: sessions.map((s: any) => s.speaker.name),
      subTitles: sessions.map((s: any) => s.title),
      speakerImageUrl: sessions.map((s: any) => s.speaker?.profileUrl || seminar.imageUrl),
    };
  });

  const isLoading = isListLoading || detailQueries.some((q) => q.isLoading);

  return (
    <div>
      <Header hamburgerOpen={hamburgerOpen} setHamburgerOpen={setHamburgerOpen} />
      <div className="flex flex-col justify-center px-20 pt-64">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} tags={tags} />
        {isLoading && <LoadingSpinner />}

        <div className="flex flex-col items-center pt-7 ">
          {combinedSeminarList.map((seminar) => (
            <div key={seminar.seminarId}>
              <div onClick={() => handleCardClick(seminar.seminarId)} className="px-5 pb-5">
                <SeminarListCard seminar={seminar} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SeminarHome;
