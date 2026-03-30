// 햄버거 바 클릭 시 나오면 영역
// 검색 영역 포함

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShowSeminar } from '../../contexts/ShowSeminarContext';
import { getHomeLink } from '../../apis/HomeManage/homeLinkApi';
import { getFAQLink } from '../../apis/HomeManage/homeFAQApi';
import { useQuery, useQueries } from '@tanstack/react-query';
import type { SeminarListResponse } from '../../types/SeminarManage/seminarCard.api';
import { getSeminarList } from '../../apis/seminarList';
import SearchResultItem from './SearchResultItem';
import { getSeminarSession } from '../../apis/seminarDetail';
import SearchResultSpeaker from './SearchResultSpeaker';
import SearchBar from './SearchBar';

type HamburgerBarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const HamburgerBar = ({ isOpen, onClose: _onClose }: HamburgerBarProps) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const { seminarNum } = useShowSeminar();

  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('');
    }
  }, [isOpen]);

  // 태그 admin에서 입력 또는 회차 번호 등 넘겨야함
  const tags = [
    { id: 1, text: `${seminarNum}회차` },
    { id: 2, text: '태그1' },
    { id: 3, text: '태그2' },
    { id: 4, text: '태그3' },
  ];

  const { data: seminarData } = useQuery<SeminarListResponse>({
    queryKey: ['seminarList'],
    queryFn: getSeminarList,
    enabled: isOpen,
  });

  const seminarList = seminarData?.result?.seminarList || [];

  const detailQueries = useQueries({
    queries: seminarList.map((seminar) => ({
      queryKey: ['seminarSession', seminar.seminarId],
      queryFn: () => getSeminarSession(seminar.seminarId),
      enabled: isOpen && seminarList.length > 0,
      staleTime: 1000 * 60 * 5,
    })),
  });

  const combinedResults = seminarList.map((seminar, index) => {
    const detailData = detailQueries[index]?.data;
    const sessions = Array.isArray(detailData?.result) ? detailData.result : [];

    const speakerNames = sessions.map((s: any) => s.speaker.name);
    const subTitles = sessions.map((s: any) => s.title);
    const speakerImageUrl = sessions.map((s: any) => s.speaker?.profileUrl || seminar.imageUrl);

    return {
      ...seminar,
      speakerNames,
      subTitles,
      speakerImageUrl,
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

  const { data: faqLinkData } = useQuery({ queryKey: ['home', 'faqLink'], queryFn: getFAQLink });
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
        {searchTerm.length > 0 ? (
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
            {/* {seminarId && (
              <button
                className="cursor-pointer"
                onClick={() => {
                  navigate('/seminar/apply-info');
                  _onClose();
                }}
              >
                <p className="text-gradient heading-3-regular">{seminarNum}회차 데브톡 신청하기</p>
              </button>
            )} */}
            <button
              className="text-black heading-3-regular cursor-pointer"
              onClick={() => {
                if (faqLinkData?.result?.url) window.open(faqLinkData.result.url, '_self');
              }}
            >
              문의하기
            </button>
            <button
              className="text-black heading-3-regular cursor-pointer"
              onClick={() => {
                if (inquiryLinkData?.result?.url) window.open(inquiryLinkData.result.url, '_self');
              }}
            >
              파트너십
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HamburgerBar;
