import { useEffect, useRef, useCallback } from "react";

interface UseIntersectionLoaderProps {
  shouldObserve: boolean; // enable/disable observer
  onIntersect: () => void; // callback when target intersects
  rootMargin?: string; // prefetch buffer
  threshold?: number | number[]; // visibility threshold
}

/**
 * Returns:
 * - containerRef: attach to scrollable container
 * - targetRef: attach to target element (e.g., last item)
 *
 * Generic hook to trigger actions when an element intersects its scroll container.
 */
export const useIntersectionObserver = ({
  shouldObserve,
  onIntersect,
  rootMargin = "100px",
  threshold = 0,
}: UseIntersectionLoaderProps) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const targetRef = useCallback(
    (node: HTMLElement | null) => {
      // Disconnect previous observer
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      if (!node || !shouldObserve) return;

      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            onIntersect();
          }
        },
        { root: containerRef.current, rootMargin, threshold },
      );

      observerRef.current.observe(node);
    },
    [shouldObserve, onIntersect, rootMargin, threshold],
  );

  useEffect(() => () => observerRef.current?.disconnect(), []);

  return { containerRef, targetRef };
};
