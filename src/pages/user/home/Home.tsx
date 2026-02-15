import Cta from '../../../components/common/Cta';
import Footer from '../../../components/common/Footer';
import Header from '../../../components/common/Header';
import SeminarPoster from '../../../components/common/SeminarPoster';
import IntroDevtalk from '../../../assets/images/introDevtalk.svg';
import ReviewCard from '../../../components/common/ReviewCard';
import ExSeminar from '../../../assets/images/exSeminar.jpg';
import { ButtonExSeminar } from '../../../components/Button/ButtonExSeminar';
import Timer from '../../../assets/icons/common/devtalkTimer.png';
import Ticket from '../../../assets/icons/common/devtalkTicket.png';
import { Button } from '../../../components/Button/Button';
import Carousel from '../../../components/LectureCard/Carousel';
import { LectureCardMain } from '../../../components/LectureCard/LectureCardMain';
import { LectureCardSpeaker } from '../../../components/LectureCard/LectureCardSpeaker';
import { LectureCardSession } from '../../../components/LectureCard/LectureCardSession';
import { useNavigate } from 'react-router-dom';
import InfiniteCarousel from '../../../components/common/InfiniteCarousel';
import { useEffect, useRef, useState } from 'react';
import { useShowSeminar } from '../../../contexts/ShowSeminarContext';
import BackgroundVideo from '../../../components/common/BackgroundVideo';
import { useHomeReviews } from '../../../hooks/HomeManage/useHomeReview';
import ComingSoon from '../../../components/common/ComingSoon';

const Home = () => {
  const navigate = useNavigate();
  const exSeminarref = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const [exVisible, setExVisible] = useState(false);
  const [bottomVisible, setBottomVisible] = useState(false);

  // const [hideCTA, setHideCTA] = useState(false);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  useEffect(() => {
    const scrollContainer = document.querySelector('.snap-y');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === exSeminarref.current) {
            setExVisible(entry.isIntersecting);
          }
          if (entry.target === bottomRef.current) {
            setBottomVisible(entry.isIntersecting);
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
  const hideCTA = exVisible || bottomVisible;

  // 노출 회차 정보
  const { seminarId, seminarNum, liveActivate, applicantActivate, isLoading } = useShowSeminar();
  const { data } = useHomeReviews();

  let ctaElement = null;
  if (applicantActivate && liveActivate && seminarId) {
    ctaElement = (
      <Cta
        bodyText="지금 바로 입장해 주세요!"
        buttonText={`${seminarNum ?? ''}회차 세미나 입장하기`}
        onClick={() => navigate('seminar/live/verification')}
        isActive
      />
    );
  } else if (applicantActivate && !liveActivate && seminarId) {
    ctaElement = (
      <Cta
        bodyText="데브톡에 빠져보세요!"
        buttonText={`${seminarNum ?? ''}회차 세미나 신청하기`}
        onClick={() => navigate('seminar/apply-info')}
        isActive={false}
      />
    );
  } else if (!applicantActivate && liveActivate && seminarId) {
    ctaElement = (
      <Cta
        bodyText="지금 바로 입장해 주세요!"
        buttonText={`${seminarNum ?? ''}회차 세미나 입장하기`}
        onClick={() => navigate('seminar/live/verification')}
        isActive
      />
    );
  } else {
    ctaElement = null;
  }

  return (
    <>
      <div>
        <Header hamburgerOpen={hamburgerOpen} setHamburgerOpen={setHamburgerOpen} />
        <div className="snap-y snap-proximity overflow-y-scroll h-screen scrollbar-hide overflow-x-hidden">
          {/* 배경 비디오 및 세미나 포스터*/}
          {seminarId ? (
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
          )}

          {/* CTA */}
          {!hideCTA && !hamburgerOpen && !isLoading && ctaElement && (
            <div className="fixed bottom-0 w-full z-50">{ctaElement}</div>
          )}

          {/* 강연 소개 카드 */}
          {seminarId && (
            <div className="flex flex-col pt-80 gap-32">
              <div className="text-white heading-2-semibold px-20 snap-none">
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
          )}

          {/* 데브톡 소개 */}
          <div className="flex flex-col pt-[200px] px-20 pb-[92px] snap-none">
            <div className="flex flex-col gap-8 pb-[16px]">
              <p className="text-white heading-2-bold">DevTalk이란?</p>
              <p className="body-1-semibold text-gradient">각자의 경험, 모두의 인사이트</p>
            </div>
            <img
              src={IntroDevtalk}
              alt="DevTalk 소개 이미지"
              className="w-[335px] h-[196px] rounded-8"
            />
            <div className="flex flex-col w-[335px] h-[100px] pt-24 body-1-medium text-grey-300">
              <p>2023년부터 지금까지,</p>
              <p>
                <span className="text-grey-50">약 1,000명의 학생이 선택한 DevTalk Seminar</span>는
              </p>
              <p className="pt-8">매 회차 IT 업계 실무자 및 전문 연사 두 분을 초청해</p>
              <p>수업에서 접할 수 없는 생생한 인사이트를 공유합니다.</p>
            </div>
          </div>

          {/* 학우들의 후기 */}
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
          </div>

          {/* 이전 세미나 알아보기 */}
          <div ref={exSeminarref} className="relative w-[375px] h-[196px] snap-center">
            {/* 이미지 */}
            <img src={ExSeminar} alt="이전 세미나" className="w-full h-full object-cover" />

            {/* 그라데이션 */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(15, 17, 20, 0.90) 0%, rgba(15, 17, 20, 0.10) 100%)',
                backdropFilter: 'blur(0.5px)',
              }}
            />

            {/* 텍스트 + 버튼 */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-16 text-center">
              <p className="text-white heading-3-semibold">과거 데브톡 내용이 궁금하다면?</p>
              <ButtonExSeminar />
            </div>
          </div>

          <div className="h-[120px]"></div>

          {/* 신청하기 */}
          {seminarId && !isLoading && (
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
          )}

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
