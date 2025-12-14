import { coursesQuery, type CourseListParams } from '@apis/courses';
import LoadingSpinner from '@components/assets/LoadingSpinner';
import styled from '@emotion/styled';
import { useEffect, useMemo, useRef } from 'react';
import { CheckCoursesProvider } from '../context/CheckCoursesContext';
import CourseCardList from './courseList/CourseCardList';
import BatchEnrollButton from './BatchEnrollButton';

type Props = {
  params?: CourseListParams;
};

function CourseCardCheckListContent({ params }: Props) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    coursesQuery.useCoursesInfiniteQuery(params);

  const observerTarget = useRef<HTMLDivElement>(null);
  const throttleTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        if (throttleTimer.current) return;

        throttleTimer.current = setTimeout(() => {
          fetchNextPage();
          throttleTimer.current = null;
        }, 500);
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
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const allCourses = useMemo(
    () => data.pages.flatMap(page => page.content),
    [data.pages]
  );
  const totalElements = data.pages[0]?.totalElements || 0;

  if (allCourses.length === 0) {
    return (
      <S.EmptyContainer>
        <S.EmptyMessage>등록된 강의가 없습니다.</S.EmptyMessage>
      </S.EmptyContainer>
    );
  }

  return (
    <S.Container>
      <CourseCardList data={data} />
      <S.ObserverTarget ref={observerTarget} />
      {!hasNextPage && allCourses.length > 0 ? (
        <S.PaginationInfo>
          총 {totalElements}개의 강의를 모두 불러왔습니다.
        </S.PaginationInfo>
      ) : (
        <LoadingSpinner />
      )}
      <BatchEnrollButton />
    </S.Container>
  );
}

function CourseCardCheckList(props: Props) {
  return (
    <CheckCoursesProvider>
      <CourseCardCheckListContent {...props} />
    </CheckCoursesProvider>
  );
}

export default CourseCardCheckList;

const S = {
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level6};
  `,

  SelectionInfo: styled.div`
    color: ${({ theme }) => theme.PALETTE.gray[70]};
    font: ${({ theme }) => theme.FONTS.body.medium};
  `,

  ButtonGroup: styled.div`
    display: flex;
    gap: ${({ theme }) => theme.GAP.level3};
  `,

  CardGrid: styled.div`
    width: 100%;
    display: grid;
    gap: ${({ theme }) => theme.GAP.level6};
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));

    @media (width <= 768px) {
      grid-template-columns: 1fr;
    }
  `,

  EmptyContainer: styled.div`
    width: 100%;
    min-height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;

    padding: ${({ theme }) => theme.PADDING.p8};

    background-color: ${({ theme }) => theme.PALETTE.gray[5]};
    border-radius: ${({ theme }) => theme.RADIUS.medium};
  `,

  EmptyMessage: styled.p`
    color: ${({ theme }) => theme.PALETTE.gray[50]};
    font: ${({ theme }) => theme.FONTS.body.large};
    text-align: center;
  `,

  PaginationInfo: styled.div`
    width: 100%;

    padding: ${({ theme }) => theme.PADDING.p4};

    background-color: ${({ theme }) => theme.PALETTE.gray[5]};

    color: ${({ theme }) => theme.PALETTE.gray[60]};
    font: ${({ theme }) => theme.FONTS.body.small};
    text-align: center;
    border-radius: ${({ theme }) => theme.RADIUS.small};
  `,

  ObserverTarget: styled.div`
    width: 100%;
    height: 20px;
  `,

  LoadingContainer: styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    padding: ${({ theme }) => theme.PADDING.p6};
  `,

  LoadingMessage: styled.p`
    color: ${({ theme }) => theme.PALETTE.gray[70]};
    font: ${({ theme }) => theme.FONTS.body.medium};
  `,
};
