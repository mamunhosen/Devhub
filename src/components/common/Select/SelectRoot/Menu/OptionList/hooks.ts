import { useState, useMemo } from "react";

export const useVirtualization = (
  totalItems: number,
  itemHeight: number,
  containerHeight: number,
  overscan: number = 5,
) => {
  const [scrollTop, setScrollTop] = useState<number>(0);

  const visibleRange = useMemo(() => {
    const startIndex = Math.max(
      0,
      Math.floor(scrollTop / itemHeight) - overscan,
    );
    const visibleCount = Math.ceil(containerHeight / itemHeight);
    const endIndex = Math.min(
      totalItems - 1,
      startIndex + visibleCount + overscan * 2,
    );

    return { startIndex, endIndex };
  }, [scrollTop, itemHeight, containerHeight, totalItems, overscan]);

  const totalHeight = totalItems * itemHeight;
  const offsetY = visibleRange.startIndex * itemHeight;

  return {
    visibleRange,
    totalHeight,
    offsetY,
    setScrollTop,
  };
};
