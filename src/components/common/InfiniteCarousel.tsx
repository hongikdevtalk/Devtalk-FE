import { useEffect, useRef, useState, type ReactNode } from 'react';

interface InfiniteCarouselProps {
  children: ReactNode;
}

export default function InfiniteCarousel({ children }: InfiniteCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const REVIEWCARD_WIDTH = 335;
  const INTERVAL = 4000;

  const childrenArray = Array.isArray(children) ? children : [children];

  // children 배열 뒤에 첫 번째 요소 복제
  const slides = [...childrenArray, childrenArray[0]];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const handleTransitionEnd = () => {
    if (currentIndex === slides.length - 1) {
      setIsTransitioning(false);
      setCurrentIndex(0);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsTransitioning(true));
      });
    }
  };

  return (
    <div className="overflow-hidden w-[375px] mx-auto">
      <div
        ref={containerRef}
        className="flex"
        style={{
          gap: `8px`,
          transform: `translateX(calc(${-(
            currentIndex *
            (REVIEWCARD_WIDTH + 8)
          )}px + (50% - ${REVIEWCARD_WIDTH / 2}px)))`,
          transition: isTransitioning ? 'transform 0.5s ease-out' : 'none',
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {slides.map((slide, i) => (
          <div key={i} className="flex-shrink-0" style={{ width: REVIEWCARD_WIDTH }}>
            {slide}
          </div>
        ))}
      </div>
    </div>
  );
}
