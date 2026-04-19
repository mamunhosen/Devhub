import { useState, useMemo, useCallback } from "react";

interface UseVirtualizerProps {
  totalItems: number;
  itemHeight: number;
  containerHeight: number;
  overscan?: number;
}

interface VirtualizerResult {
  visibleRange: { startIndex: number; endIndex: number };
  totalHeight: number;
  offsetY: number;
  handleScroll: (e: React.UIEvent<HTMLDivElement>) => void;
}

export const useVirtualizer = ({
  totalItems,
  itemHeight,
  containerHeight,
  overscan = 5,
}: UseVirtualizerProps): VirtualizerResult => {
  const [scrollTop, setScrollTop] = useState(0);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

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

  return { visibleRange, totalHeight, offsetY, handleScroll };
};
