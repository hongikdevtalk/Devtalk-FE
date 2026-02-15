import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import ChevronLeftIcon from '../../../assets/icons/common/chevronleft.svg';
import ReviewTable from '../../../components/admin/seminar-manage/Review/ReviewTable';
import { useReviewActions } from '../../../hooks/SeminarManage/actions/useReviewActions';
import { useSeminarReviews } from '../../../hooks/SeminarManage/data/useSeminarReviews';
import LoadingSpinner from '../../../components/common/LoadingSpinner';

const Reviews = () => {
  const navigate = useNavigate();
  const { id: seminarIdParam } = useParams<{ id: string }>();
  const seminarId = Number(seminarIdParam);

  const {
    data: reviewListData,
    isLoading: isReviewLoading,
    isError,
  } = useSeminarReviews(seminarId);

  const {
    handleRegisterReviewToHome,
    handleUnregisterReviewFromHome,
    isLoading: isToggleLoading,
  } = useReviewActions({ seminarId });

  useEffect(() => {
    if (isNaN(seminarId)) {
      alert('잘못된 세미나 ID입니다.');
      navigate(-1);
    }
  }, [seminarId, navigate]);

  const handleToggle = (reviewId: number, newStatus: boolean) => {
    if (isToggleLoading) return;

    if (newStatus) {
      handleRegisterReviewToHome(reviewId);
    } else {
      handleUnregisterReviewFromHome(reviewId);
    }
  };

  if (isReviewLoading) {
    return <LoadingSpinner />;
  }

  if (isError || !reviewListData) {
    return (
      <div className="text-red-500 text-center p-10">후기 목록을 불러오는 데 실패했습니다.</div>
    );
  }

  return (
    <div className="mx-60 my-40">
      <div className="flex gap-10 items-center mb-10">
        <button onClick={() => navigate(-1)}>
          <img src={ChevronLeftIcon} className="cursor-pointer" />
        </button>
        <h1 className="heading-1-bold text-white">
          {`${reviewListData.result?.seminarNum}회차 후기 목록`}
        </h1>
      </div>

      <ReviewTable
        reviews={reviewListData.result?.reviews}
        handleToggle={handleToggle}
        isLoading={isToggleLoading}
      />
    </div>
  );
};

export default Reviews;
