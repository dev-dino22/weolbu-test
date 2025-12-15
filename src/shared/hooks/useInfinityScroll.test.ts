import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useInfinityScroll } from './useInfinityScroll';

describe('useInfinityScroll', () => {
  let mockIntersectionObserver: {
    observe: ReturnType<typeof vi.fn>;
    unobserve: ReturnType<typeof vi.fn>;
    disconnect: ReturnType<typeof vi.fn>;
  };
  let intersectionCallback: IntersectionObserverCallback;

  beforeEach(() => {
    vi.clearAllTimers();
    vi.useFakeTimers();

    mockIntersectionObserver = {
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    };

    const MockIntersectionObserver = class {
      observe = mockIntersectionObserver.observe;
      unobserve = mockIntersectionObserver.unobserve;
      disconnect = mockIntersectionObserver.disconnect;

      constructor(callback: IntersectionObserverCallback) {
        intersectionCallback = callback;
      }
    };

    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
  });

  it('observerTarget ref를 반환한다', () => {
    const { result } = renderHook(() =>
      useInfinityScroll({
        fetchNextPage: vi.fn(),
        hasNextPage: true,
      })
    );

    expect(result.current.observerTarget).toBeDefined();
    expect(result.current.observerTarget.current).toBeNull();
  });

  it('타겟이 화면에 보이고 다음 페이지가 있을 때 fetchNextPage를 즉시 호출한다', () => {
    const mockFetchNextPage = vi.fn();

    renderHook(() =>
      useInfinityScroll({
        fetchNextPage: mockFetchNextPage,
        hasNextPage: true,
        isFetchingNextPage: false,
        throttleMs: 500,
      })
    );

    intersectionCallback(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      {} as IntersectionObserver
    );

    expect(mockFetchNextPage).toHaveBeenCalledTimes(1);
  });

  it('타겟이 화면에 보이지 않을 때는 fetchNextPage를 호출하지 않는다', () => {
    const mockFetchNextPage = vi.fn();

    renderHook(() =>
      useInfinityScroll({
        fetchNextPage: mockFetchNextPage,
        hasNextPage: true,
        isFetchingNextPage: false,
        throttleMs: 500,
      })
    );

    intersectionCallback(
      [{ isIntersecting: false } as IntersectionObserverEntry],
      {} as IntersectionObserver
    );

    expect(mockFetchNextPage).not.toHaveBeenCalled();
  });

  it('다음 페이지가 없을 때는 fetchNextPage를 호출하지 않는다', () => {
    const mockFetchNextPage = vi.fn();

    renderHook(() =>
      useInfinityScroll({
        fetchNextPage: mockFetchNextPage,
        hasNextPage: false,
        isFetchingNextPage: false,
        throttleMs: 500,
      })
    );

    intersectionCallback(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      {} as IntersectionObserver
    );

    expect(mockFetchNextPage).not.toHaveBeenCalled();
  });

  it('이미 데이터를 가져오는 중일 때는 fetchNextPage를 호출하지 않는다', () => {
    const mockFetchNextPage = vi.fn();

    renderHook(() =>
      useInfinityScroll({
        fetchNextPage: mockFetchNextPage,
        hasNextPage: true,
        isFetchingNextPage: true,
        throttleMs: 500,
      })
    );

    intersectionCallback(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      {} as IntersectionObserver
    );

    expect(mockFetchNextPage).not.toHaveBeenCalled();
  });

  it('시간 내에 여러 번 호출되어도 한 번만 fetchNextPage를 실행한다', () => {
    const mockFetchNextPage = vi.fn();

    renderHook(() =>
      useInfinityScroll({
        fetchNextPage: mockFetchNextPage,
        hasNextPage: true,
        isFetchingNextPage: false,
        throttleMs: 500,
      })
    );

    intersectionCallback(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      {} as IntersectionObserver
    );
    expect(mockFetchNextPage).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(100);

    intersectionCallback(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      {} as IntersectionObserver
    );
    expect(mockFetchNextPage).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(100);

    intersectionCallback(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      {} as IntersectionObserver
    );
    expect(mockFetchNextPage).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(300);

    intersectionCallback(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      {} as IntersectionObserver
    );
    expect(mockFetchNextPage).toHaveBeenCalledTimes(2);

    vi.advanceTimersByTime(100);

    // 다섯 번째 호출 - throttle 중이므로 무시
    intersectionCallback(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      {} as IntersectionObserver
    );

    // 총 두 번 실행
    expect(mockFetchNextPage).toHaveBeenCalledTimes(2);
  });
});
