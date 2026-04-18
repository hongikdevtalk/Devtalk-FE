// 햄버거 바 클릭 시 나오면 영역

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHomeLink } from '../../apis/HomeManage/homeLinkApi';
import { useQuery, useQueries } from '@tanstack/react-query';
import type { SeminarListResponse } from '../../types/SeminarManage/seminarCard.api';
import { getSeminarList } from '../../apis/seminarList';
import SearchResultItem from './SearchResultItem';
import { getSeminarSession } from '../../apis/seminarDetail';
import SearchResultSpeaker from './SearchResultSpeaker';
import SearchBar from './SearchBar';
import { getPopularTags } from '../../apis/popularTag';
import PartnershipExitModal from '../Modal/PartnershipExitModal';

type HamburgerBarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const HamburgerBar = ({ isOpen, onClose: _onClose }: HamburgerBarProps) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('');
    }
  }, [isOpen]);

  const { data: popularTagsData } = useQuery({
    queryKey: ['popularTags'],
    queryFn: getPopularTags,
    enabled: isOpen,
    staleTime: 1000 * 60 * 10,
  });

  const tags =
    popularTagsData?.result?.map((tag: string, index: number) => ({
      id: index + 1,
      text: tag,
    })) || [];

  const { data: seminarData } = useQuery<SeminarListResponse>({
    queryKey: ['seminarList'],
    queryFn: getSeminarList,
    enabled: isOpen,
  });

  const seminarResults = seminarData?.result?.seminarList || [];

  const detailQueries = useQueries({
    queries: seminarResults.map((seminar) => ({
      queryKey: ['seminarSession', seminar.seminarId],
      queryFn: () => getSeminarSession(seminar.seminarId),
      enabled: isOpen && seminarResults.length > 0,
      staleTime: 1000 * 60 * 5,
    })),
  });

  const combinedResults = seminarResults.map((seminar, index) => {
    const detailData = detailQueries[index]?.data;
    const sessions = Array.isArray(detailData?.result) ? detailData.result : [];

    return {
      ...seminar,
      speakerNames: sessions.map((s: any) => s.speaker.name),
      subTitles: sessions.map((s: any) => s.title),
      speakerImageUrl: sessions.map((s: any) => s.speaker?.profileUrl || seminar.imageUrl),
    };
  });

  const filteredResults = combinedResults.filter((item) => {
    if (!searchTerm || !searchTerm.trim()) return false;
    const term = searchTerm.toLowerCase().trim();

    const matchesNum = String(item.seminarNum) === term.replace(/[^0-9]/g, '');
    const matchesTopic = item.seminarTopic.toLowerCase().includes(term);
    const matchesSpeaker = item.speakerNames.some((name: string) =>
      name.toLowerCase().includes(term)
    );

    return matchesNum || matchesTopic || matchesSpeaker;
  });

  const { data: inquiryLinkData } = useQuery({
    queryKey: ['home', 'inquiryLink'],
    queryFn: getHomeLink,
  });

  return (
    <div
      className={`fixed w-full max-w-[400px] h-screen bg-background transform transition-transform duration-400 z-40 overflow-hidden flex flex-col ${
        isOpen ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="self-stretch px-5 pt-[70px] pb-[30px] flex flex-col justify-center items-start gap-3 overflow-hidden shrink-0">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={(value) => setSearchTerm(value)}
          tags={tags}
        />
      </div>
      {/* 콘텐츠 영역 */}
      <div className="flex-1 w-full overflow-y-auto">
        {searchTerm.trim().length > 0 ? (
          filteredResults.length > 0 ? (
            <div className="flex flex-col">
              {filteredResults.map((result) => (
                <div key={result.seminarId} className="flex flex-col">
                  <SearchResultItem key={result.seminarId} result={result} onClose={_onClose} />
                  <div className="h-0.5 bg-grey-400 w-full" />
                  <SearchResultSpeaker
                    result={{
                      seminarId: result.seminarId,
                      seminarNum: result.seminarNum,
                      speakerNames: result.speakerNames,
                      subTitles: result.subTitles,
                      speakerImageUrl: result.speakerImageUrl,
                    }}
                    onClose={_onClose}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full h-full flex justify-center items-center pb-40">
              <span className="text-grey-700 heading-3-regular">검색 결과가 없습니다.</span>
            </div>
          )
        ) : (
          <div className="self-stretch p-5 flex flex-col justify-center items-start gap-10 overflow-hidden">
            <button
              className="text-black heading-3-regular cursor-pointer"
              onClick={() => {
                navigate('/speakerList');
                _onClose();
              }}
            >
              DevTalk 연사
            </button>
            <button
              className="text-black heading-3-regular cursor-pointer"
              onClick={() => {
                navigate('/seminarList');
                _onClose();
              }}
            >
              세미나 아카이브
            </button>
            <button
              className="text-black heading-3-regular cursor-pointer"
              onClick={() => {
                if (inquiryLinkData?.result?.url) window.open(inquiryLinkData.result.url, '_self');
              }}
            >
              문의하기
            </button>
            <button
              className="text-black heading-3-regular cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              파트너십
            </button>
          </div>
        )}
      </div>
      <PartnershipExitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={'준비 중인 페이지입니다.'}
      />
    </div>
  );
};

export default HamburgerBar;
