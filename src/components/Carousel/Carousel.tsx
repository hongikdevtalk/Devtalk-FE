import { useMemo, useRef, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import chevronrightduo from '../../assets/icons/common/chevronrightduo.svg';

export default function Carousel({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();

  const CARD_WIDTH = 302 + 20;
  const displayItems = useMemo(() => {
    const childrenArray = Array.isArray(children) ? children : [children];
    return childrenArray.slice(0, 3);
  }, [children]);
  const totalItems = displayItems.length + 1;

  const handleTouchStart = (e: React.TouchEvent) => setStartX(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaX = e.changedTouches[0].clientX - startX;
    handleSwipe(deltaX);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };
  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    handleSwipe(e.clientX - startX);
  };

  const handleSwipe = (deltaX: number) => {
    if (deltaX > 20 && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else if (deltaX < -20 && currentIndex < totalItems - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="overflow-hidden w-full bg-background pt-2.5 pb-5">
      <div
        ref={containerRef}
        className="flex items-center transition-transform duration-300 ease-out cursor-grab active:cursor-grabbing select-none"
        style={{
          transform: `translateX(calc(20px - ${currentIndex * CARD_WIDTH}px))`,
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {/* 카드 리스트 */}
        {displayItems.map((child, index) => (
          <div key={index} className="flex-shrink-0 mr-[20px]">
            {child}
          </div>
        ))}

        {/* 더보기 영역 */}
        <div
          onClick={() => navigate('/seminarList')}
          className="flex-shrink-0 flex items-center gap-[6px] px-5 h-[346px] cursor-pointer"
        >
          <span className="heading-3-medium font-medium text-black whitespace-nowrap">더보기</span>
          <img
            src={chevronrightduo}
            alt="chevronrightduo"
            className="w-[119.06px] h-[24px] cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
