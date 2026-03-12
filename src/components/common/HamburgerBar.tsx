// 햄버거 바 클릭 시 나오면 영역
// 검색 영역 포함

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShowSeminar } from '../../contexts/ShowSeminarContext';
import { getHomeLink } from '../../apis/HomeManage/homeLinkApi';
import { getFAQLink } from '../../apis/HomeManage/homeFAQApi';
import { useQuery, useQueries } from '@tanstack/react-query';
import SearchIcon from '../../assets/icons/common/search.svg';
import type { SeminarListResponse } from '../../types/SeminarManage/seminarCard.api';
import { getSeminarList } from '../../apis/seminarList';
import SearchResultItem from './SearchResultItem';
import { getSeminarSession } from '../../apis/seminarDetail';
import SearchResultSpeaker from './SearchResultSpeaker';

type HamburgerBarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const HamburgerBar = ({ isOpen, onClose: _onClose }: HamburgerBarProps) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const { seminarId, seminarNum } = useShowSeminar();

  // 태그 admin에서 입력 또는 회차 번호 등 넘겨야함
  const Tags = [
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
      queryKey: ['seminarDetail', seminar.seminarId],
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
      className={`fixed w-full max-w-[375px] h-screen bg-background transform transition-transform duration-400 z-40 overflow-hidden flex flex-col ${
        isOpen ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="w-full h-[44px] shrink-0" />

      <div className="self-stretch px-5 py-7 flex flex-col justify-center items-start gap-3 overflow-hidden shrink-0">
        <div className="w-full inline-flex justify-between items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="검색어를 입력해 주세요."
            className="w-full text-black text-xl font-normal font-['Pretendard'] outline-none bg-transparent placeholder:text-grey-700"
          />
          <div className="w-6 h-6 flex justify-center items-center shrink-0">
            <img src={SearchIcon} alt="search" className="w-[18px] h-[18px]" />
          </div>
        </div>
        <div className="self-stretch h-0.5 bg-primary-300" />

        {/* 태그 리스트 */}
        <div className="self-stretch inline-flex justify-start items-start gap-3 flex-wrap content-start">
          {Tags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => setSearchTerm(tag.text)}
              className="px-2.5 py-2 bg-[radial-gradient(ellipse_134.44%_154.40%_at_86.96%_107.14%,_#ADE657_0%,_#4FC78F_100%)] rounded-[10px] flex justify-center items-center gap-2.5 active:scale-95 transition-transform"
            >
              <span className="text-white text-base font-medium font-['Pretendard']">
                # {tag.text}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 콘텐츠 영역 */}
      <div className="flex-1 w-full overflow-y-auto">
        {searchTerm.length > 0 ? (
          filteredResults.length > 0 ? (
            <div className="flex flex-col">
              {filteredResults.map((result) => (
                <div key={result.seminarId} className="flex flex-col">
                  <SearchResultItem key={result.seminarId} result={result} onClose={_onClose} />
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
              <span className="text-grey-700 text-xl font-normal">검색 결과가 없습니다.</span>
            </div>
          )
        ) : (
          <div className="self-stretch p-5 flex flex-col justify-center items-start gap-10 overflow-hidden">
            <button
              className="text-black text-xl font-normal font-['Pretendard'] cursor-pointer"
              onClick={() => {
                navigate('/'); // navigate 할 곳 필요..
                _onClose();
              }}
            >
              DevTalk 연사
            </button>
            <button
              className="text-black text-xl font-normal font-['Pretendard'] cursor-pointer"
              onClick={() => {
                navigate('/seminar');
                _onClose();
              }}
            >
              세미나 아카이브
            </button>
            {seminarId && (
              <button
                className="cursor-pointer"
                onClick={() => {
                  navigate('/seminar/apply-info');
                  _onClose();
                }}
              >
                <p className="text-gradient text-xl font-bold font-['Pretendard']">
                  {seminarNum}회차 데브톡 신청하기
                </p>
              </button>
            )}
            <button
              className="text-black text-xl font-normal font-['Pretendard'] cursor-pointer"
              onClick={() => {
                if (faqLinkData?.result?.url) window.open(faqLinkData.result.url, '_self');
              }}
            >
              문의하기
            </button>
            <button
              className="text-black text-xl font-normal font-['Pretendard'] cursor-pointer"
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
