// Home 페이지
// 이전 코드들은 필요한 코드들 제외 현재 주석 처리해놓음.
// Home - Devtalk 소개, 카드리스트(현재, 이전[연사카드]), FAQ 관련, 신청하기 버튼

// import Cta from '../../../components/common/Cta';
import Footer from '../../../components/common/Footer';
import Header from '../../../components/common/Header';
// import SeminarPoster from '../../../components/common/SeminarPoster';
import IntroDevtalk from '../../../assets/images/introDevtalk.svg';
// import ReviewCard from '../../../components/common/ReviewCard';
// import ExSeminar from '../../../assets/images/exSeminar.jpg';
// import { ButtonExSeminar } from '../../../components/Button/ButtonExSeminar';
// import Timer from '../../../assets/icons/common/devtalkTimer.png';
// import Ticket from '../../../assets/icons/common/devtalkTicket.png';
import { Button } from '../../../components/Button/Button';
import Carousel from '../../../components/Carousel/Carousel';
import { SeminarInfoCard } from '../../../components/Carousel/SeminarInfoCard';
import { SeminarExCard } from '../../../components/Carousel/SeminarExCard';
// import { LectureCardMain } from '../../../components/LectureCard/LectureCardMain';
// import { LectureCardSpeaker } from '../../../components/LectureCard/LectureCardSpeaker';
// import { LectureCardSession } from '../../../components/LectureCard/LectureCardSession';
import { useNavigate } from 'react-router-dom';
// import InfiniteCarousel from '../../../components/common/InfiniteCarousel';
// import InfiniteCarousel from '../../../components/common/InfiniteCarousel';
import { useEffect, useRef, useState } from 'react';
// import { useShowSeminar } from '../../../contexts/ShowSeminarContext';
// import BackgroundVideo from '../../../components/common/BackgroundVideo';
// import { useHomeReviews } from '../../../hooks/HomeManage/useHomeReview';
// import ComingSoon from '../../../components/common/ComingSoon';
import FaqItems from '../../../components/common/FaqItems';
// import dev from '../../../assets/logos/dev.svg';
import { useQuery, useQueries } from '@tanstack/react-query';
import { getSeminarList } from '../../../apis/seminarList';
// import type { SeminarSessionResponse } from '../../../types/SeminarDetail/seminarDetail';
import { getSeminarSession } from '../../../apis/seminarDetail';
import poster from '../../../assets/logos/poster.png';

const Home = () => {
  const navigate = useNavigate();
  const exSeminarref = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  //const [exVisible, setExVisible] = useState(false);
  //const [bottomVisible, setBottomVisible] = useState(false);
  //const [exVisible, setExVisible] = useState(false);
  //const [bottomVisible, setBottomVisible] = useState(false);

  // const [hideCTA, setHideCTA] = useState(false);
  const { data: seminarResponse } = useQuery({
    queryKey: ['seminarList'],
    queryFn: getSeminarList,
  });
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  const seminarList = seminarResponse?.result?.seminarList || [];

  const sortedSeminars =
    seminarList.length > 0 ? [...seminarList].sort((a, b) => b.seminarNum - a.seminarNum) : [];
  const latestSeminar = sortedSeminars[0];
  // const pastSeminars = sortedSeminars.slice(1);

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
            //setExVisible(entry.isIntersecting);
            //setExVisible(entry.isIntersecting);
          }
          if (entry.target === bottomRef.current) {
            //setBottomVisible(entry.isIntersecting);
            //setBottomVisible(entry.isIntersecting);
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
  // const hideCTA = exVisible || bottomVisible;
  // const hideCTA = exVisible || bottomVisible;

  // 노출 회차 정보 -> 원본
  // const { seminarId, seminarNum, liveActivate, applicantActivate, isLoading } = useShowSeminar();

  // const { data } = useHomeReviews();
  // 노출 회차 정보 -> 원본
  // const { seminarId, seminarNum, liveActivate, applicantActivate, isLoading } = useShowSeminar();

  // const { data } = useHomeReviews();

  // let ctaElement = null;
  // if (applicantActivate && liveActivate && seminarId) {
  //   ctaElement = (
  //     <Cta
  //       bodyText="지금 바로 입장해 주세요!"
  //       buttonText={`${seminarNum ?? ''}회차 세미나 입장하기`}
  //       onClick={() => navigate('seminar/live/verification')}
  //       isActive
  //     />
  //   );
  // } else if (applicantActivate && !liveActivate && seminarId) {
  //   ctaElement = (z
  //     <Cta
  //       bodyText="데브톡에 빠져보세요!"
  //       buttonText={`${seminarNum ?? ''}회차 세미나 신청하기`}
  //       onClick={() => navigate('seminar/apply-info')}
  //       isActive={false}
  //     />
  //   );
  // } else if (!applicantActivate && liveActivate && seminarId) {
  //   ctaElement = (
  //     <Cta
  //       bodyText="지금 바로 입장해 주세요!"
  //       buttonText={`${seminarNum ?? ''}회차 세미나 입장하기`}
  //       onClick={() => navigate('seminar/live/verification')}
  //       isActive
  //     />
  //   );
  // } else {
  //   ctaElement = null;
  // }

  return (
    <>
      <div>
        <Header hamburgerOpen={hamburgerOpen} setHamburgerOpen={setHamburgerOpen} />
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
            <div className="flex flex-col justify-between px-5 pt-2.5 pb-5">
              <img
                src={IntroDevtalk}
                alt="DevTalk 소개 이미지"
                className="w-[335px] h-[196px] rounded-8"
              />
              <div className="flex flex-col w-[335px] h-[100px] pt-[16px] body-1-medium text-grey-700">
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
                {/* <LectureCardMain seminarId={seminarId ?? 0} index={0} />
                <LectureCardSpeaker seminarId={seminarId ?? 0} index={0} /> */}
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

          {/* 신청 버튼 */}
          <div className="px-5 pb-10">
            <Button
              variant="custom"
              text={`${latestSeminar?.seminarNum ?? ''}회차 세미나 신청하기`}
              onClick={() => navigate('/seminar/apply-info')}
              className="w-full h-[24px] px-6 py-4 rounded-[10px] 
              text-white heading-3-semibold bg-[radial-gradient(ellipse_171.17%_557.08%_at_74.62%_100.00%,_#BDF548_0%,_#4EABB5_100%)]"
            />
          </div>

          {/* 푸터 */}
          <div ref={bottomRef} className="w-full h-[1px]" />
          <div className="h-[122px] snap-start">
            <Footer />
          </div>
        </div>

        {/* <div className="w-full max-w-[440px] mx-auto pt-[56px]"></div> */}
        {/* 배경 비디오 및 세미나 포스터*/}
        {/* {seminarId ? (
            <div className="snap-center relative w-[376px] h-[585px] mx-auto pt-[56px]">
              <BackgroundVideo />
              <div className="relative z-10">
                <SeminarPoster />
              </div>
            </div>
          ) : (
            <div className="snap-center relative w-[376px] h-[585px] mx-auto pt-[56px]">
              <ComingSoon />
            </div>
          )} */}

        {/* CTA */}
        {/* {!hideCTA && !hamburgerOpen && !isLoading && ctaElement && (
            <div className="fixed bottom-0 w-full z-50">{ctaElement}</div>
          )} */}

        {/* 강연 소개 카드 */}
        {/* {seminarId && (
            <div className="flex flex-col pt-80 gap-32">
              <div className="text-black heading-2-semibold px-20 snap-none">
              <div className="text-black heading-2-semibold px-20 snap-none">
                다가오는 세미나 강연 소개
              </div>

              <div className="flex flex-col snap-center pb-[80px]">
                <Carousel>
                  <LectureCardMain seminarId={seminarId ?? 0} index={0} />
                  <LectureCardSpeaker seminarId={seminarId ?? 0} index={0} />
                  <LectureCardSession seminarId={seminarId ?? 0} index={0} />
                </Carousel>
              </div>
              <div className="flex flex-col snap-center">
                <Carousel>
                  <LectureCardMain seminarId={seminarId ?? 0} index={1} />
                  <LectureCardSpeaker seminarId={seminarId ?? 0} index={1} />
                  <LectureCardSession seminarId={seminarId ?? 0} index={1} />
                </Carousel>
              </div>
            </div>
          )} */}

        {/* 학우들의 후기
          <div className="flex flex-col px-20 gap-16 pb-[200px] snap-none">
            <p className="text-white heading-2-bold">학우들의 후기</p>
            <div className="-mx-20">
              <InfiniteCarousel>
                {data?.result?.map((review) => (
                  <ReviewCard
                    key={review.reviewId}
                    session={review.seminarNum}
                    rating={review.rating}
                    content={review.content}
                  />
                ))}
              </InfiniteCarousel>
            </div>
          </div> */}

        {/* 이전 세미나 알아보기 */}
        {/* <div ref={exSeminarref} className="relative w-[375px] h-[196px] snap-center"> */}
        {/* 이미지 */}
        {/* <img src={ExSeminar} alt="이전 세미나" className="w-full h-full object-cover" /> */}
        {/* 이전 세미나 알아보기 */}
        {/* <div ref={exSeminarref} className="relative w-[375px] h-[196px] snap-center"> */}
        {/* 이미지 */}
        {/* <img src={ExSeminar} alt="이전 세미나" className="w-full h-full object-cover" /> */}

        {/* 그라데이션 */}
        {/* <div
        {/* 그라데이션 */}
        {/* <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(15, 17, 20, 0.90) 0%, rgba(15, 17, 20, 0.10) 100%)',
                backdropFilter: 'blur(0.5px)',
              }}
            /> */}

        {/* 텍스트 + 버튼 */}
        {/* <div className="absolute inset-0 flex flex-col items-center justify-center gap-16 text-center">
              <p className="text-white heading-3-semibold">과거 데브톡 내용이 궁금하다면?</p>
              <ButtonExSeminar />
            </div> */}
        {/* </div> */}

        {/* <div className="h-[120px]"></div> */}

        {/* 신청하기 */}
        {/* {seminarId && !isLoading && (
            <>
              {liveActivate ? (
                <div className="flex flex-col items-center px-20 pb-[100px] gap-16">
                  <p className="text-white heading-2-bold">지금 바로 입장하세요!</p>
                  <div className="flex flex-col w-[335px] gap-28">
                    <div className="flex flex-col items-center gap-16">
                      <img
                        src={Ticket}
                        alt="티켓 아이콘"
                        className="w-[240px] h-[153px] object-cover"
                      />
                    </div>
                    <Button
                      variant="default"
                      text={`${seminarNum ?? ''}회차 세미나 입장하기`}
                      onClick={() => navigate('seminar/live/verification')}
                    />
                  </div>
                </div>
              ) : applicantActivate ? (
                <div className="flex flex-col items-center px-20 pb-[100px] gap-16">
                  <p className="text-white heading-2-bold">지금 바로 신청하세요!</p>
                  <div className="flex flex-col w-[335px] gap-28">
                    <div className="flex flex-col items-center gap-16">
                      <img
                        src={Timer}
                        alt="타이머 아이콘"
                        className="w-[240px] h-[153px] object-cover"
                      />
                    </div>
                    <Button
                      variant="default"
                      text={`${seminarNum ?? ''}회차 세미나 신청하기`}
                      onClick={() => navigate('/seminar/apply-info')}
                    />
                  </div>
                </div>
              ) : null}
            </>
          )} */}
      </div>
    </>
  );
};

export default Home;
