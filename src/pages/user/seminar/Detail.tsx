import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Header from '../../../components/common/Header';
import SeminarDetailCard from '../../../components/Seminar/SeminarDetailCard';
import ReviewCard from '../../../components/common/ReviewCard';
import Cta from '../../../components/common/Cta';
import SeminarDetailLectureCard from '../../../components/Seminar/SeminarDetailLectureCard';
import { useIsVisible } from '../../../hooks/useIsVisible';
import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getSeminarReview } from '../../../apis/seminarDetail';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import { useShowSeminar } from '../../../contexts/ShowSeminarContext';
import { getSeminarDetail } from '../../../apis/seminarDetail';

const SeminarDetail = () => {
  const { id } = useParams();
  const seminarId = Number(id);
  const [searchParams] = useSearchParams();
  const speakerName = searchParams.get('speaker');

  const lectureRef = useRef<HTMLDivElement>(null);
  const secondRef = useRef<HTMLDivElement>(null);
  const reviewRef = useRef<HTMLDivElement>(null);

  const lectureVisible = useIsVisible(lectureRef as React.RefObject<HTMLDivElement>);
  const secondVisible = useIsVisible(secondRef as React.RefObject<HTMLDivElement>);
  const reviewVisible = useIsVisible(reviewRef as React.RefObject<HTMLDivElement>);

  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (speakerName) {
      const element = document.getElementById(speakerName);
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [speakerName]);

  useEffect(() => {
    if (secondVisible && secondRef.current) {
      secondRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [secondVisible]);

  const { data, isLoading } = useQuery({
    queryKey: ['seminarReview', seminarId],
    queryFn: () => getSeminarReview(seminarId),
    enabled: !!id,
  });

  const { data: detailData } = useQuery({
    queryKey: ['seminarDetail', seminarId],
    queryFn: () => getSeminarDetail(seminarId),
    enabled: !!seminarId,
  });

  const seminarNumber = detailData?.result?.seminarNum;

  const seminarReviews = data?.result || [];

  // 노출 회차 정보
  const { seminarNum, applicantActivate, liveActivate } = useShowSeminar();

  // 현재 보고 있는 세미나가 현재 노출 세미나인지 확인
  const isCurrentSeminar = seminarNum !== null && seminarNumber === seminarNum;

  return (
    <div>
      <Header hamburgerOpen={hamburgerOpen} setHamburgerOpen={setHamburgerOpen} />
      <div className="flex flex-col gap-32 bg-background pt-[50px]">
        {seminarId && <SeminarDetailCard key={seminarId} id={seminarId} />}
        <div
          ref={lectureRef}
          className={`w-full flex flex-col gap-[24px] px-[20px] transition-all duration-500 ease-out transform ${
            lectureVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="flex flex-col gap-10 justify-center items-center bg-background ">
            <SeminarDetailLectureCard
              key={`${seminarId}-0`}
              seminarId={seminarId}
              seminarNum={seminarNumber ?? 0}
              index={0}
            />
            <div ref={secondRef}>
              <SeminarDetailLectureCard
                key={`${seminarId}-1`}
                seminarId={seminarId}
                seminarNum={seminarNumber ?? 0}
                index={1}
              />
            </div>
          </div>
          <div className="mt-40 h-[2px] shrink-0 self-stretch bg-grey-400" />
        </div>
        <div
          key={`review-${seminarId}`}
          ref={reviewRef}
          className={`transition-all duration-500 ease-out transform gap-12 px-20 flex flex-col ${
            reviewVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="heading-2-5-medium text-black mb-2">후기</div>
          <div className="w-full flex flex-col gap-12">
            {isLoading && <LoadingSpinner />}
            {seminarReviews.length === 0 ? (
              //등록된 후기가 없는 경우
              <div className="body-2-medium text-grey-200">후기가 존재하지 않습니다.</div>
            ) : (
              //등록된 후기 중 최대 3개까지 표시
              seminarReviews.slice(0, 3).map((review) => (
                <div key={review.reviewId}>
                  <ReviewCard
                    session={review.seminarNum}
                    rating={review.score}
                    content={review.strength}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px]">
        {isCurrentSeminar && liveActivate ? (
          <Cta
            bodyText="지금 바로 입장해 주세요!"
            buttonText={`${seminarNum ?? ''}회차 세미나 입장하기`}
            onClick={() => navigate('/seminar/live/verification')}
          />
        ) : isCurrentSeminar && applicantActivate ? (
          <Cta
            buttonText={`${seminarNum ?? ''}회차 세미나 신청하기`}
            onClick={() => navigate('/seminar/apply-info')}
          />
        ) : !isCurrentSeminar ? (
          <Cta
            buttonText="후기 작성하기"
            onClick={() => navigate('/seminar/review')}
          />
        ) : null}
      </div>
      <div className="h-[250px]" />
    </div>
  );
};

export default SeminarDetail;
