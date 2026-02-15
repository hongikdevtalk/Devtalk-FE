import SeminarReviewInput from './SeminarReviewInput';

type ReviewValues = {
  strength: string;
  improvement: string;
  nextTopic: string;
};

interface ReviewFormProps {
  values: ReviewValues;
  onChange: (field: keyof ReviewValues, value: string) => void;
}
const SeminarReviewForm = ({ values, onChange }: ReviewFormProps) => {
  const { strength, improvement, nextTopic } = values;

  return (
    <div className="h-[663px] flex flex-col px-20 gap-48 items-start">
      <div className="w-[335px] h-[189px] flex flex-col itmes-start gap-12">
        <div className="flex flex-row gap-4">
          <div className="heading-3-semibold text-white ">세미나의 좋았던 점을 남겨주세요</div>
          <div className="text-[20px] font-extrabold text-gradient">*</div>
        </div>
        <SeminarReviewInput
          placeholder="이번 회차 데브톡 세미나에 대해 좋았던 점을 자유롭게 입력해주세요."
          input={strength}
          onChange={(value) => onChange('strength', value)}
        />
      </div>

      <div className="w-[335px] h-[189px] flex flex-col gap-12">
        <div className="heading-3-semibold text-white ">세미나의 아쉬웠던 점을 남겨주세요</div>

        <SeminarReviewInput
          placeholder="이번 회차 데브톡 세미나에 대해 아쉬웠던 점을 자유롭게 입력해주세요."
          input={improvement}
          onChange={(value) => onChange('improvement', value)}
        />
      </div>

      <div className="w-[335px] h-[189px] flex flex-col gap-12">
        <div className="heading-3-semibold text-white ">다음 회차에서 듣고 싶은 주제가 있나요?</div>

        <SeminarReviewInput
          placeholder="다음 회차 데브톡 세미나에서 다뤘으면 하는 주제가 있다면 자유롭게 입력해주세요."
          input={nextTopic}
          onChange={(value) => onChange('nextTopic', value)}
        />
      </div>
    </div>
  );
};

export default SeminarReviewForm;
