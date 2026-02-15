import { Link } from 'react-router-dom';
import chevronRightIcon from '../../../../assets/icons/common/chevronright.svg';

interface ReviewLinkProps {
  seminarId: number;
}

const ReviewLink = ({ seminarId }: ReviewLinkProps) => {
  return (
    <div className="bg-grey-900 p-6 rounded-10">
      <Link
        to={`/admin/seminars/${seminarId}/reviews`}
        className="flex justify-between items-center"
      >
        <div className="heading-2-bold text-white">후기 목록</div>
        <img src={chevronRightIcon} className="cursor-pointer w-5 h-5" />
      </Link>
    </div>
  );
};

export default ReviewLink;
