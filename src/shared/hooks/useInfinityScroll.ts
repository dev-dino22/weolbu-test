import { useEffect, useRef } from 'react';

type UseInfinityScrollParams = {
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  debounceMs?: number;
};

export function useInfinityScroll({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  debounceMs = 500,
}: UseInfinityScrollParams) {
  const observerTarget = useRef<HTMLDivElement>(null);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!fetchNextPage) return;

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        if (debounceTimer.current) return;

        debounceTimer.current = setTimeout(() => {
          fetchNextPage();
          debounceTimer.current = null;
        }, debounceMs);
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
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, debounceMs]);

  return { observerTarget };
}
