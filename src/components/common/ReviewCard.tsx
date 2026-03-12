import ReviewStar from '../../assets/icons/components/ReviewCard/ReviewStar.svg?react';
import ReviewStarFilled from '../../assets/icons/components/ReviewCard/ReviewStarFilled.svg?react';

type ReviewCardProps = {
  session: number;
  rating: number;
  content: string;
};

const ReviewCard = ({ rating, content }: ReviewCardProps) => {
  return (
    <div className="w-full flex flex-col items-start gap-[12px] rounded-[5px] bg-grey-300 px-[20px] pt-[20px] pb-[30px]">
      <div className="flex flex-row gap-8 items-center">
        <div className="flex flex-row">
          {Array.from({ length: 5 }).map((_, index) =>
            rating > index ? (
              <ReviewStarFilled key={index} className="w-[20px] h-[20px]" />
            ) : (
              <ReviewStar
                key={index}
                className="w-[20px] h-[20px]"
                style={{ fill: '#DCDFE4' }}
              />
            )
          )}
        </div>
        <div className="flex flex-row gap-2">
          <div className="body-2-semibold text-black">{rating}</div>
          <div className="body-2-semibold text-grey-700">/5</div>
        </div>
      </div>
      <div className="body-1-regular text-black">{content}</div>
    </div>
  );
};

export default ReviewCard;
