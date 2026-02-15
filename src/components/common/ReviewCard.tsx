import ReviewStar from '../../assets/icons/components/ReviewCard/ReviewStar.svg?react';

type ReviewCardProps = {
  session: number;
  rating: number;
  content: string;
};

const ReviewCard = ({ session, rating, content }: ReviewCardProps) => {
  return (
    <div className="w-[335px] h-[157px] bg-grey-800 rounded-8 px-20 py-16 flex flex-col gap-12">
      <div className="flex flex-col gap-8">
        <div className="w-[79px] h-[25px] rounded-4 bg-grey-900 text-center whitespace-nowrap">
          <span className=" px-8 py-4 caption-semibold text-gradient">{session}회차 세미나</span>
        </div>
        <div className="flex flex-row gap-8 h-[20px]">
          <div className="w-[100px] h-full flex flex-row">
            {Array.from({ length: 5 }).map((_, index) => (
              <ReviewStar
                key={index}
                className="w-[20px] h-[20px]"
                style={{
                  fill: rating > index ? 'url(#paint0_linear_524_3678)' : '#4B5362',
                }}
              />
            ))}
          </div>
          <div className="w-[26px] h-full gap-2 flex flex-row">
            <div className="body-2-semibold text-white">{rating}</div>
            <div className="body-2-semibold text-grey-500">/5</div>
          </div>
        </div>
      </div>
      <div className="w-full h-60 body-2-medium text-grey-100">{content}</div>
    </div>
  );
};

export default ReviewCard;
