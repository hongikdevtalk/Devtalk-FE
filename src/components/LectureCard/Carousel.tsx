import { useRef, useState } from "react";

export default function Carousel({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const CARD_WIDTH = 311 + 12;

  // TouchEvent
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const deltaX = e.changedTouches[0].clientX - startX;
    handleSwipe(deltaX);
  };

  // MouseEvent
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);

    const deltaX = e.clientX - startX;
    handleSwipe(deltaX);
  };

  // 공통 스와이프 처리
  const handleSwipe = (deltaX: number) => {
    if (deltaX > 10 && currentIndex > 0) {
      // 오른쪽 → 이전 카드
      setCurrentIndex((prev) => prev - 1);
    } else if (
      deltaX < -10 &&
      currentIndex < (containerRef.current?.children.length ?? 0) - 1
    ) {
      // 왼쪽 → 다음 카드
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="overflow-hidden w-full">
      <div
        ref={containerRef}
        className="flex pl-32 gap-12 pr-32 select-none cursor-grab"
        style={{
          transform: `translateX(-${currentIndex * CARD_WIDTH}px)`,
          transition: "transform 0.3s ease-out",
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {children}
      </div>
    </div>
  );
}
