import { useEffect, useRef } from 'react';

type UseInfinityScrollParams = {
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  throttleMs?: number;
};

export function useInfinityScroll({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  throttleMs = 500,
}: UseInfinityScrollParams) {
  const observerTarget = useRef<HTMLDivElement>(null);
  const throttleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!fetchNextPage) return;

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        if (throttleTimer.current) return;

        throttleTimer.current = setTimeout(() => {
          fetchNextPage();
          throttleTimer.current = null;
        }, throttleMs);
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
    });

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
      if (throttleTimer.current) {
        clearTimeout(throttleTimer.current);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, throttleMs]);

  return { observerTarget };
}
