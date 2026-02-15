import { useState, useRef, useEffect } from 'react';
import StarRating from './StarRating';
import moremenu from '../../../assets/icons/components/ReviewCard/moremenu.svg';

export interface Review {
  reviewId: string;
  rating: number;
  visible: boolean;
  order: number;
  content: string;
  department: string;
  grade: string;
  nextTopic: string;
  createdAt: string;
}

interface HomeReviewItemProps {
  review: Review;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
  onDelete: (id: string) => void;
}

const HomeReviewItem: React.FC<HomeReviewItemProps> = ({
  review,
  onMoveUp,
  onMoveDown,
  onDelete,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="bg-grey-700 rounded-lg px-6 py-[15px] flex flex-col justify-between min-h-[220px] border-none">
      <div>
        <div className="flex justify-between items-start mb-3">
          <StarRating rating={review.rating} />
          <span
            className={`caption-semibold px-3 py-1 rounded-full ${
              review.visible ? 'bg-green-500/20 text-green-300' : 'bg-green-900/20 text-green-800'
            }`}
          >
            {review.visible ? '공개' : '비공개'}
          </span>
        </div>

        <div className="flex justify-between body-2-medium text-grey-300 mb-[6px]">
          <p>
            {review.department} {review.grade}
          </p>
          <p>{review.createdAt}</p>
        </div>

        <p className="body-1-medium text-white whitespace-pre-line line-clamp-3">
          {review.content}
        </p>
      </div>

      <div className="flex justify-between items-start mt-[20px] gap-4">
        <p className="text-sm text-white break-words flex-1">
          <span className="text-grey-400">다음에 듣고 싶은 주제:</span> {review.nextTopic}
        </p>

        <div className="relative shrink-0" ref={menuRef}>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <img src={moremenu} className="cursor-pointer" />
          </button>

          {isMenuOpen && review.visible && (
            <div className="absolute bottom-0 right-0 translate-y-full w-[140px] bg-grey-800 rounded-md z-10">
              <ul className="caption-semibold flex flex-col">
                <li className="border-b border-black">
                  <button
                    onClick={() => {
                      onMoveUp(review.reviewId);
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-center py-[6px] hover:bg-grey-600 rounded-t-md cursor-pointer"
                  >
                    순위 올리기
                  </button>
                </li>
                <li className="border-b border-black">
                  <button
                    onClick={() => {
                      onMoveDown(review.reviewId);
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-center py-[6px] hover:bg-grey-600 cursor-pointer"
                  >
                    순위 내리기
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onDelete(review.reviewId)}
                    className="w-full text-center py-[6px] text-status-error hover:bg-grey-600 rounded-b-md cursor-pointer"
                  >
                    삭제하기
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeReviewItem;
