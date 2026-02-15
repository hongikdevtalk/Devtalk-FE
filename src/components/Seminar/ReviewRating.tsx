import ReviewStar from '../../assets/icons/components/ReviewCard/ReviewStar.svg?react';

interface ReviewRatingProps {
  rating: number;
  onChange: (value: number) => void;
}

const ReviewRating = ({ rating, onChange }: ReviewRatingProps) => {
  const handleStarClick = (index: number) => {
    onChange(index + 1);
  };

  return (
    <>
      <div className="w-[375px] h-[50px] px-20 flex flex-row gap-0 justify-center">
        {Array.from({ length: 5 }).map((_, index) => (
          <ReviewStar
            key={index}
            className="w-[50px] h-[50px] cursor-pointer"
            style={{
              fill: rating > index ? 'url(#paint0_linear_524_3678)' : '#4B5362',
            }}
            onClick={() => handleStarClick(index)}
          />
        ))}
      </div>
    </>
  );
};

export default ReviewRating;
