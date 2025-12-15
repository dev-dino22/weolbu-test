import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CourseCardInfinityList from './CourseCardInfinityList';
import * as coursesApi from '@apis/courses';
import { ThemeProvider } from '@emotion/react';
import { THEME } from '@styles/global';
import type { CourseListResponse } from '@apis/courses';
import type {
  UseSuspenseInfiniteQueryResult,
  InfiniteData,
} from '@tanstack/react-query';

vi.mock('@apis/courses', async () => {
  const actual = await vi.importActual('@apis/courses');
  return {
    ...actual,
    coursesQuery: {
      useCoursesInfiniteQuery: vi.fn(),
    },
  };
});

vi.mock('../../context/CheckCoursesContext', () => ({
  useCheckCourses: () => ({
    selectedCourseIds: new Set(),
    toggleSelection: vi.fn(),
  }),
}));

describe('CourseCardInfinityList 컴포넌트 단위 테스트', () => {
  let mockFetchNextPage: ReturnType<typeof vi.fn>;
  let intersectionCallback: IntersectionObserverCallback;
  let mockQueryReturn: {
    data: InfiniteData<CourseListResponse, unknown>;
    fetchNextPage: ReturnType<typeof vi.fn>;
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
  };

  beforeEach(() => {
    vi.clearAllTimers();
    vi.useFakeTimers();

    mockFetchNextPage = vi.fn(() => {
      mockQueryReturn.data.pages.push({
        content: [
          {
            id: 2,
            title: '테스트 강의 2',
            description: '설명 2',
            instructorName: '강사 2',
            maxStudents: 30,
            currentStudents: 5,
            availableSeats: 25,
            isFull: false,
            price: 200000,
            createdAt: '2025-01-02',
          },
        ],
        pageable: { pageNumber: 1, pageSize: 1 },
        totalElements: 2,
        totalPages: 2,
        first: false,
        last: true,
      });
      mockQueryReturn.hasNextPage = false;
      vi.mocked(
        coursesApi.coursesQuery.useCoursesInfiniteQuery
      ).mockReturnValue(
        mockQueryReturn as unknown as UseSuspenseInfiniteQueryResult<
          InfiniteData<CourseListResponse, unknown>
        >
      );
    });

    const mockIntersectionObserver = {
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

    mockQueryReturn = {
      data: {
        pages: [
          {
            content: [
              {
                id: 1,
                title: '테스트 강의 1',
                description: '설명 1',
                instructorName: '강사 1',
                maxStudents: 30,
                currentStudents: 10,
                availableSeats: 20,
                isFull: false,
                price: 100000,
                createdAt: '2025-01-01',
              },
            ],
            pageable: { pageNumber: 0, pageSize: 1 },
            totalElements: 2,
            totalPages: 2,
            first: true,
            last: false,
          },
        ],
        pageParams: [undefined],
      },
      fetchNextPage: mockFetchNextPage,
      hasNextPage: true,
      isFetchingNextPage: false,
    };

    vi.mocked(coursesApi.coursesQuery.useCoursesInfiniteQuery).mockReturnValue(
      mockQueryReturn as unknown as UseSuspenseInfiniteQueryResult<
        InfiniteData<CourseListResponse, unknown>
      >
    );
  });

  it('스크롤 시 다음 페이지를 불러온다', () => {
    const { rerender } = render(
      <ThemeProvider theme={THEME}>
        <CourseCardInfinityList />
      </ThemeProvider>
    );

    expect(screen.getByText('테스트 강의 1')).toBeInTheDocument();
    expect(screen.queryByText('테스트 강의 2')).not.toBeInTheDocument();

    intersectionCallback(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      {} as IntersectionObserver
    );

    vi.advanceTimersByTime(1000);

    expect(mockFetchNextPage).toHaveBeenCalledTimes(1);

    rerender(
      <ThemeProvider theme={THEME}>
        <CourseCardInfinityList />
      </ThemeProvider>
    );

    expect(screen.getByText('테스트 강의 1')).toBeInTheDocument();
    expect(screen.getByText('테스트 강의 2')).toBeInTheDocument();
  });
});
