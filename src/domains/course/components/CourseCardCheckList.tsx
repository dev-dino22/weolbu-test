import { coursesQuery, type CourseListParams } from '@apis/courses';
import Button from '@components/actions/Button';
import LoadingSpinner from '@components/assets/LoadingSpinner';
import { useShowToast } from '@components/toast/ToastProvider';
import styled from '@emotion/styled';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  CheckCoursesProvider,
  useCheckCourses,
} from '../context/CheckCoursesContext';
import CourseCardList from './courseList/CourseCardList';

type Props = {
  params?: CourseListParams;
};

function CourseCardCheckListContent({ params }: Props) {
  const showToast = useShowToast();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    coursesQuery.useCoursesInfiniteQuery(params);
  const batchEnrollMutation = coursesQuery.useBatchEnrollMutation();

  const observerTarget = useRef<HTMLDivElement>(null);
  const throttleTimer = useRef<NodeJS.Timeout | null>(null);

  const { selectedCourseIds, clearSelection, setFailedCourses } =
    useCheckCourses();

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

  const handleEnroll = useCallback(() => {
    if (selectedCourseIds.size === 0) {
      showToast({ mode: 'ERROR', message: '수강 신청할 강의를 선택해주세요.' });
      return;
    }

    batchEnrollMutation.mutate(
      { courseIds: Array.from(selectedCourseIds) },
      {
        onSuccess: response => {
          const successCount = response.success.length;
          const failedCount = response.failed.length;

          if (successCount > 0 && failedCount === 0) {
            showToast({
              mode: 'SUCCESS',
              message: `${successCount}개 강의 수강 신청이 완료되었습니다.`,
            });
            clearSelection();
          } else if (successCount > 0 && failedCount > 0) {
            showToast({
              mode: 'WARN',
              message: `${successCount}개 강의는 신청 완료, ${failedCount}개 강의는 신청 실패했습니다.`,
            });
            const failedIds = response.failed.map(f => f.courseId);
            setFailedCourses(failedIds);
          } else {
            showToast({
              mode: 'ERROR',
              message: '모든 강의 수강 신청에 실패했습니다.',
            });
          }

          if (failedCount > 0) {
            response.failed.forEach(failed => {
              showToast({
                mode: 'ERROR',
                message: `강의 ID ${failed.courseId}: ${failed.reason}`,
              });
            });
          }
        },
        onError: () => {
          showToast({
            mode: 'ERROR',
            message: '수강 신청 중 오류가 발생했습니다.',
          });
        },
      }
    );
  }, [
    selectedCourseIds,
    batchEnrollMutation,
    showToast,
    clearSelection,
    setFailedCourses,
  ]);

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

      {isFetchingNextPage && (
        <S.LoadingContainer>
          <S.LoadingMessage>강의 목록을 불러오는 중...</S.LoadingMessage>
        </S.LoadingContainer>
      )}

      {!hasNextPage && allCourses.length > 0 ? (
        <S.PaginationInfo>
          총 {totalElements}개의 강의를 모두 불러왔습니다.
        </S.PaginationInfo>
      ) : (
        <LoadingSpinner />
      )}
      <S.EnrollButtonBox>
        <Button
          onClick={handleEnroll}
          disabled={
            selectedCourseIds.size === 0 || batchEnrollMutation.isPending
          }
        >
          {batchEnrollMutation.isPending
            ? '신청 중...'
            : `${selectedCourseIds.size}개 수강 신청`}
        </Button>
      </S.EnrollButtonBox>
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

  EnrollButtonBox: styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    position: sticky;
    bottom: 24px;
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
