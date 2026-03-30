import Header from '../../../components/common/Header';
import SearchBar from '../../../components/common/SearchBar';
import { useQuery, useQueries } from '@tanstack/react-query';
import { getSeminarList } from '../../../apis/seminarList';
import type { SeminarListResponse } from '../../../types/SeminarManage/seminarCard.api';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import { useState } from 'react';
import SearchResultSpeaker from '../../../components/common/SearchResultSpeaker';
import { getSeminarSession } from '../../../apis/seminarDetail';

const TAGS = [
  { id: 1, text: '태그1' },
  { id: 2, text: '태그2' },
  { id: 3, text: '태그3' },
];

function SeminarHome() {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isLoading: isListLoading } = useQuery<SeminarListResponse>({
    queryKey: ['seminarList'],
    queryFn: getSeminarList,
  });

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
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} tags={TAGS} />
        {isLoading && <LoadingSpinner />}

        <div className="flex flex-col items-center pt-7 ">
          {combinedSeminarList.map((seminar) => (
            <div key={seminar.seminarId}>
              <SearchResultSpeaker
                result={{
                  seminarId: seminar.seminarId,
                  seminarNum: seminar.seminarNum,
                  speakerNames: seminar.speakerNames,
                  subTitles: seminar.subTitles,
                  speakerImageUrl: seminar.speakerImageUrl,
                }}
                onClose={() => setHamburgerOpen(false)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SeminarHome;
