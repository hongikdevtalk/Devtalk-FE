import type { ReviewData } from '../../../../types/SeminarManage/seminarReview.api';
import ToggleSwitch from './ToggleSwitch';
import CheckIcon from '../../../../assets/icons/components/Review/check.svg?react';

interface ReviewTableProps {
  reviews: ReviewData[] | undefined;
  handleToggle: (reviewId: number, newStatus: boolean) => void;
  isLoading?: boolean;
}

const headers = [
  { name: 'No.', width: 'w-[70px]' },
  { name: '이름', width: 'w-[90px]' },
  { name: '학번', width: 'w-[110px]' },
  { name: '학과', width: 'w-[190px]' },
  { name: '학년', width: 'w-[80px]' },
  { name: '별점', width: 'w-[70px]' },
  { name: '좋았던 점', width: 'w-[320px]' },
  { name: '아쉬웠던 점', width: 'w-[320px]' },
  { name: '듣고 싶은 주제', width: 'w-[200px]' },
  { name: '비공개 요청', width: 'w-[90px]' },
  { name: '공개', width: 'w-[100px]' },
];

const ReviewTable = ({ reviews, handleToggle, isLoading }: ReviewTableProps) => {
  const defaultCellClass = 'px-5 py-5';
  const NoWrapCellClass = `${defaultCellClass} whitespace-nowrap`;

  if (!reviews || reviews?.length === 0) {
    return <div className="text-center my-9 text-gray-400 subhead-1-medium">후기가 없습니다</div>;
  }

  return (
    <div className="min-w-[1280px] overflow-x-auto rounded-8">
      <table className="text-white text-center ">
        <thead className="bg-grey-700 subhead-2-medium text-grey-200">
          <tr>
            {headers.map((header) => (
              <th key={header.name} className={`px-4 py-3 ${header.width}`}>
                {header.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-grey-900">
          {reviews.map((review, index) => (
            <tr key={index} className="body-2-semibold">
              <td className={NoWrapCellClass}>{index + 1}</td>
              <td className={NoWrapCellClass}>{review.name}</td>
              <td className={NoWrapCellClass}>{review.studentNum}</td>
              <td className={`${defaultCellClass} whitespace-pre-line`}>
                {review.department.split(',').join('\n')}
              </td>
              <td className={NoWrapCellClass}>{review.grade}</td>
              <td className={NoWrapCellClass}>{review.score}</td>
              <td className={defaultCellClass}>{review.strength}</td>
              <td className={defaultCellClass}>{review.improvement}</td>
              <td className={defaultCellClass}>{review.nextTopic}</td>
              <td className={NoWrapCellClass}>
                <div className="flex items-center justify-center">
                  {review.isPublic ? '' : <CheckIcon />}
                </div>
              </td>
              <td>
                <div className="flex items-center justify-center">
                  <ToggleSwitch
                    isEnabled={review.isFeatured}
                    onToggle={(newStatus) => handleToggle(review.reviewId, newStatus)}
                    disabled={!review.isPublic || isLoading}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewTable;
