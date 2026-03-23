import React from "react";

interface CrouselNavigatorProps {
  currentIdx: number;
  totalLength: number;
  onScroll: (index: number) => void;
}

const CrouselNavigator = ({
  currentIdx,
  totalLength,
  onScroll,
}: CrouselNavigatorProps) => {
  return (
    <>
      <div className="hidden md:flex items-center justify-center gap-2 mb-3">
        {Array.from({ length: totalLength }).map((_, index) => {
          const isActive = index === currentIdx;
          return (
            <button
              key={index}
              type="button"
              onClick={() => onScroll(index)}
              className={`rounded-full bg-(--text-primary) transition-all cursor-pointer size-2 ${
                isActive ? "opacity-100" : "opacity-40"
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          );
        })}
      </div>
    </>
  );
};

export default CrouselNavigator;
