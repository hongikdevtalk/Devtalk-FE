// Home 페이지
// Home - Devtalk 소개, 카드리스트(현재, 이전[연사카드]), FAQ 관련, 신청하기 버튼

import Footer from '../../../components/common/Footer';
import Header from '../../../components/common/Header';
import IntroDevtalk from '../../../assets/images/introDevtalk.svg';
import { Button } from '../../../components/Button/Button';
import Carousel from '../../../components/Carousel/Carousel';
import { SeminarInfoCard } from '../../../components/Carousel/SeminarInfoCard';
import { SeminarExCard } from '../../../components/Carousel/SeminarExCard';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import FaqItems from '../../../components/common/FaqItems';
import { useQuery, useQueries } from '@tanstack/react-query';
import { getSeminarList } from '../../../apis/seminarList';
import { getSeminarSession } from '../../../apis/seminarDetail';
import poster from '../../../assets/logos/poster.png';
import { getShowSeminar } from '../../../apis/ShowSeminar/userShowSeminar';

const Home = () => {
  const navigate = useNavigate();
  const exSeminarref = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const { data: seminarResponse } = useQuery({
    queryKey: ['seminarList'],
    queryFn: getSeminarList,
  });

  const { data: showSeminarResponse } = useQuery({
    queryKey: ['showSeminar'],
    queryFn: getShowSeminar,
    staleTime: 0,
  });

  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);

  const seminarList = seminarResponse?.result?.seminarList || [];

  const isApplyActive = showSeminarResponse?.result?.applicantActivate;
  const activeSeminarNum = showSeminarResponse?.result?.seminarNum;

  const sortedSeminars =
    seminarList.length > 0 ? [...seminarList].sort((a, b) => b.seminarNum - a.seminarNum) : [];
  const latestSeminar = sortedSeminars[0];

  const detailQueries = useQueries({
    queries: sortedSeminars.map((seminar) => ({
      queryKey: ['seminarDetail', seminar.seminarId],
      queryFn: () => getSeminarSession(seminar.seminarId),
      staleTime: 1000 * 60 * 5,
    })),
  });

  const combinedSeminars = sortedSeminars.map((seminar, index) => {
    const detailData = detailQueries[index]?.data;

    const sessions = Array.isArray(detailData?.result) ? detailData.result : [];
    const speakerNames = sessions.map((session: any) => session.speaker?.name || '연사 미정');
    const subTitles = sessions.map((session: any) => session.title || '주제 미정');
    const speakerImageUrl = sessions[0]?.speaker?.profileUrl || seminar.imageUrl;

    return {
      ...seminar,
      summary: seminar.seminarTopic,
      speakerNames,
      subTitles,
      speakerImageUrl,
      isClosed: index !== 0,
    };
  });

  useEffect(() => {
    const scrollContainer = document.querySelector('.snap-y');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === exSeminarref.current) {
          }
          if (entry.target === bottomRef.current) {
          }
        });
      },
      { threshold: 0.3, root: scrollContainer ?? null }
    );

    if (exSeminarref.current) observer.observe(exSeminarref.current);
    if (bottomRef.current) observer.observe(bottomRef.current);

    return () => {
      if (exSeminarref.current) observer.unobserve(exSeminarref.current);
      if (bottomRef.current) observer.unobserve(bottomRef.current);
    };
  }, []);

  useEffect(() => {
    const scrollContainer = document.querySelector('.snap-y');

    const handleScroll = () => {
      if (!scrollContainer) return;
      setHeaderScrolled(scrollContainer.scrollTop > 0);
    };

    handleScroll();
    scrollContainer?.addEventListener('scroll', handleScroll);

    return () => {
      scrollContainer?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div>
        <Header
          hamburgerOpen={hamburgerOpen}
          setHamburgerOpen={setHamburgerOpen}
          isScrolled={headerScrolled}
        />
        <div className="snap-y snap-proximity overflow-y-scroll h-screen scrollbar-hide overflow-x-hidden">
          {/* 데브톡 이미지 */}
          <section className="relative w-full h-[520px] snap-start">
            <img src={poster} alt="DevTalk Poster" className="w-full h-[520px] object-cover" />
          </section>
          <div className="py-[14px]" />

          {/* 데브톡 소개 */}
          <section>
            <div className="flex flex-col pt-2.5 px-[24px]">
              <p className="text-black heading-3-medium">DevTalk이란?</p>
            </div>
            <div className="flex flex-col justify-between px-[24px] pt-2.5 pb-5">
              <img
                src={IntroDevtalk}
                alt="DevTalk 소개 이미지"
                className="w-full h-[196px] rounded-8 object-cover"
              />
              <div className="flex flex-col w-full pt-[16px] body-1-medium text-grey-700">
                <p>2023년부터 지금까지,</p>
                <p>
                  <span className="text-grey-700 font-bold">
                    약 1,000명의 학생이 선택한 DevTalk Seminar
                  </span>
                  는
                </p>
                <p className="pt-8">매 회차 IT 업계 실무자 및 전문 연사 두 분을 초청해</p>
                <p>수업에서 접할 수 없는 생생한 인사이트를 공유합니다.</p>
              </div>
            </div>
          </section>
          <div className="py-[14px]" />

          {/* Seminar Info */}
          <section>
            <div className="flex flex-col pt-2.5 px-[24px]">
              <p className="text-black heading-3-medium">Seminar Info</p>
            </div>

            {/* 카드 리스트 */}
            <div className="flex flex-col pb-5">
              <Carousel>
                {latestSeminar && <SeminarInfoCard seminar={latestSeminar} />}

                {...combinedSeminars.slice(1).map((item) => (
                  <div key={item.seminarId} className="flex-shrink-0 w-full">
                    <SeminarExCard key={item.seminarId} seminar={item} />
                  </div>
                ))}
              </Carousel>
            </div>
          </section>
          <div className="py-[14px]" />

          {/* FAQ 섹션 */}
          <section>
            <div className="flex flex-col pt-2.5 px-[24px]">
              <p className="text-black heading-3-medium">FAQ</p>
            </div>

            <div className="flex flex-col">
              <FaqItems
                question="데브톡에 대해 알려주세요!"
                answer="DevTalk은 IT 업계 실무자들의 경험을 학생들에게 전하기 위해 매 회차 다양한 연사를 초청해 진행하는 학생 주도 세미나입니다. 전공이나 학년에 상관없이 누구나 참여할 수 있습니다."
                highlightText="전공이나 학년에 상관없이 누구나 참여할 수 있습니다."
              />

              <FaqItems
                question="세미나 자료나 다시보기가 제공되나요?"
                answer="일부 세미나 회차의 경우 데브톡 사이트에서 자료 또는 다시보기 링크가 제공될 예정입니다. 하지만 가능하다면 현장에서 라이브로 참여하시는 것을 추천드립니다. 현장에서는 연사의 이야기 흐름과 분위기, 질문과 소통을 통해 더 많은 경험을 얻어가실 수 있습니다."
                highlightText="가능하다면 현장에서 라이브로 참여하시는 것을 추천드립니다."
              />

              <FaqItems question="참가비가 있나요?" answer="DevTalk 세미나는 무료로 운영됩니다." />

              <FaqItems
                question="세미나 일정은 어디서 확인하나요?"
                answer="DevTalk 메인 페이지 또는 공지사항에서 최신 일정과 연사 정보를 확인할 수 있습니다."
              />

              <FaqItems
                question="다음 연사로 참여하고 싶어요!"
                answer="성함, 연락처(전화번호 또는 메일), 간단한 이력(LinkedIn 등 링크로 대체 가능)을 [dev.hongik@gmail.com]으로 보내주시면 담당자를 통해 빠르게 연락드리겠습니다."
                highlightText="성함, 연락처(전화번호 또는 메일), 간단한 이력"
              />
            </div>
          </section>
          <div className="py-[14px]" />

          {/* 플로팅 신청 버튼 */}
          {isApplyActive && activeSeminarNum && (
            <div className="fixed bottom-10 left-0 w-full px-5 z-50 pointer-events-none">
              <div className="max-w-[384px] mx-auto pointer-events-auto">
                <Button
                  variant="custom"
                  text={`${latestSeminar?.seminarNum ?? ''}회차 세미나 신청하기`}
                  onClick={() => navigate('/seminar/apply-info')}
                  className="w-full h-[56px] px-6 py-4 rounded-[12px] text-white heading-3-semibold shadow-lg
                          bg-[img:var(--gradient-button)] transition-transform active:scale-95"
                />
              </div>
            </div>
          )}

          {/* 푸터 */}
          <div ref={bottomRef} className="w-full h-[1px]" />
          <div className="h-[122px] snap-start">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
