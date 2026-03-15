import SeminarReviewInput from './SeminarReviewInput';

type ReviewValues = {
  review: string;
};

interface ReviewFormProps {
  values: ReviewValues;
  onChange: (field: keyof ReviewValues, value: string) => void;
}
const SeminarReviewForm = ({ values, onChange }: ReviewFormProps) => {
  const { review } = values;

  return (
    <div className="flex flex-col px-20 gap-48 items-start">
      <div className="w-[335px] h-[189px] flex flex-col items-start gap-12">
        <div className="flex flex-row gap-4"></div>
        <SeminarReviewInput
          placeholder="후기를 작성해주세요."
          input={review}
          onChange={(value) => onChange('review', value)}
        />
      </div>
    </div>
  );
};

export default SeminarReviewForm;
