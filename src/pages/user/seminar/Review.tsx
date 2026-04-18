import { useState } from 'react';
import Header from '../../../components/common/Header';
import { Button } from '../../../components/Button/Button';
import ReviewRating from '../../../components/Seminar/ReviewRating';
import SeminarReviewForm from '../../../components/Seminar/SeminarReviewForm';
import { useMutation, useQuery } from '@tanstack/react-query';
import { postSeminarReview } from '../../../apis/seminarReview';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import { Chip } from '../../../components/Chip/Chip';
import BackButton from '../../../components/Button/BackButton';
import { useShowSeminar } from '../../../contexts/ShowSeminarContext';
import { getSeminarSession } from '../../../apis/seminarDetail';
import { useSeminarAuth } from '../../../hooks/SeminarLive/useSeminarAuth';
import ReviewModal from '../../../components/Modal/ReviewAlertModal';

type ReviewValues = {
  review: string;
};

const Review = () => {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const navigation = useNavigate();
  const { seminarId, seminarNum } = useShowSeminar();

  const [isVerified, setIsVerified] = useState(false);
  const [studentNum, setStudentNum] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const openModal = (message: string) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const { mutate: authMutate, isPending: isAuthPending } = useSeminarAuth();

  const handleNextStep = () => {
    if (!studentNum) return openModal('학번을 입력해주세요.');

    authMutate(
      { studentNum, name: '사용자' },
      {
        onSuccess: (res) => {
          if (res.result) {
            setIsVerified(true);
          } else {
            openModal('수강 내역을 찾을 수 없습니다. \n다시 한번 확인해 주세요.');
          }
        },
      }
    );
  };

  const { data: sessionData } = useQuery({
    queryKey: ['seminarDetail', seminarId],
    queryFn: () => getSeminarSession(seminarId!),
    enabled: !!seminarId,
  });

  const sessions = Array.isArray(sessionData?.result) ? sessionData.result : [];
  const speakerNames = sessions.map((s: any) => s.speaker.name).join(' / ');
  const seminarTitle = sessions.length > 0 ? sessions[0].title : '세미나 제목';
  const description = sessions.length > 0 ? sessions[0].description : '세미나 설명이 없습니다.';

  //별점
  const [score, setScore] = useState(0);

  //리뷰
  const [values, setValues] = useState<ReviewValues>({
    review: '',
  });
  const { review } = values;

  //모든 칸 입력 확인
  const isAllFilled = review.trim() !== '' && score !== 0;

  const { mutate, isPending } = useMutation({
    mutationFn: postSeminarReview,
    onSuccess: (data) => {
      if (data.isSuccess === false) {
        openModal(data.message);
        return;
      }
      if (data.result?.seminarId) {
        openModal('소중한 후기 감사합니다!');
        navigation(`/seminar/${data.result?.seminarId}`);
      } else {
        navigation('/seminar');
      }
    },

    onError: () => {
      openModal('후기 제출에 실패했습니다. 다시 시도해주세요.');
    },
  });

  //리뷰 제출 함수
  function handleSubmit() {
    if (isPending || !isAllFilled || !seminarId) return;
    mutate({
      seminarId,
      totalContent: review,
      score,
    });
  }

  //작성한 리뷰 받아오는 함수
  const handleChange = (field: keyof ReviewValues, value: string): void => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="w-full mx-auto flex flex-col gap-28">
      <Header hamburgerOpen={hamburgerOpen} setHamburgerOpen={setHamburgerOpen} />

      <div className="w-full flex flex-col justify-center pt-15">
        <div className="w-[384px] flex flex-col items-start justify-center">
          <div className="self-stretch px-5 py-7 inline-flex flex-col justify-center items-start gap-4 overflow-hidden">
            <div className="justify-start text-grey-700 body-1-medium pb-4">
              <Chip text={`${seminarNum}회차`} />
            </div>
            <div className="self-stretch flex flex-col justify-start items-start gap-1">
              <div className="self-stretch text-black heading-3-medium">{seminarTitle}</div>
              {/* 요약본 추가 필요 */}
              <div className="self-stretch text-grey-700 body-1-light text-[16px] leading-5">
                {description}
              </div>
            </div>

            <div className="flex items-start gap-3 w-full overflow-hidden pt-[16px]">
              <span className="w-[35px] flex-shrink-0 text-black subhead-1-regular leading-tight">
                연사
              </span>
              <span className="flex-1 text-black subhead-light leading-tight break-keep">
                {speakerNames || '연사 정보 로딩중..'}
              </span>
            </div>
          </div>
          <div className="self-stretch h-0.5 bg-gray-200" />

          <div className="flex-1 pt-20 flex-col items-center w-full">
            {!isVerified ? (
              <div className="flex flex-col h-[612px] items-start px-5">
                <label className="subhead-1-medium mb-16 text-black">학번을 입력해 주세요.</label>
                <input
                  type="text"
                  value={studentNum}
                  onChange={(e) => setStudentNum(e.target.value)}
                  placeholder="C60000"
                  className="self-stretch w-[340px] h-14 px-5 py-4 rounded-8 border-[1px] text-black placeholder:text-grey-700 inline-flex justify-start items-center"
                />
              </div>
            ) : (
              <>
                {/**별점 매기기 */}
                <div className="flex flex-col items-center w-full min-h-screen">
                  <div className="w-full flex flex-row items-start pt-5 pb-5">
                    <ReviewRating rating={score} onChange={setScore} />
                  </div>
                  {/**리뷰 작성 폼 */}
                  <div className="w-full h-[538px] flex flex-col items-center gap-40">
                    <SeminarReviewForm values={values} onChange={handleChange} />
                  </div>
                </div>
              </>
            )}
          </div>
          {/**제출 버튼 */}
          <div className="w-full px-5 pb-5 flex flex-row justify-between items-center overflow-hidden">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigation(-1)}>
              <BackButton />
              <span className="text-black heading-3-medium">이전</span>
            </div>

            {!isVerified ? (
              <Button
                variant="custom"
                text="다음"
                onClick={handleNextStep}
                className="!w-auto px-11 h-[56px] rounded-[10px] heading-3-medium"
              />
            ) : (
              <Button
                variant={isPending || !isAllFilled ? 'sub' : 'custom'}
                text="등록"
                onClick={handleSubmit}
                className="!w-auto px-11 h-[56px] rounded-[10px] heading-3-medium"
              />
            )}
          </div>
        </div>
        <ReviewModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          message={modalMessage}
        />

        {(isPending || isAuthPending) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <LoadingSpinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default Review;
