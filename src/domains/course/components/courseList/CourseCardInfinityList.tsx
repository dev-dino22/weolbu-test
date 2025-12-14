import { useMemo } from 'react';
import styled from '@emotion/styled';
import CourseCardList from './CourseCardList';
import { coursesQuery, type CourseListParams } from '@apis/courses';
import LoadingSpinner from '@components/assets/LoadingSpinner';
import { useInfinityScroll } from '../../hooks/useInfinityScroll';

type Props = {
  params?: CourseListParams;
};
function CourseCardInfinityList({ params }: Props) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    coursesQuery.useCoursesInfiniteQuery(params);

  const { observerTarget } = useInfinityScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

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
    <>
      <CourseCardList data={data} />
      <S.ObserverTarget ref={observerTarget} />
      {!hasNextPage && allCourses.length > 0 ? (
        <S.PaginationInfo>
          총 {totalElements}개의 강의를 모두 불러왔습니다.
        </S.PaginationInfo>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}

export default CourseCardInfinityList;

const S = {
  ObserverTarget: styled.div`
    width: 100%;
    height: 20px;
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
};
