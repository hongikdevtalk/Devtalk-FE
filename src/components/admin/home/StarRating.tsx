import ReviewStar from '/src/assets/icons/components/ReviewCard/ReviewStar.svg?react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
}

const StarRating = ({ rating }: StarRatingProps) => {
  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }).map((_, index) => (
        <ReviewStar
          key={index}
          className="w-[30px] h-[30px]"
          style={{
            fill: rating > index ? 'url(#paint0_linear_524_3678)' : '#4B5362',
          }}
        />
      ))}
    </div>
  );
};

export default StarRating;
