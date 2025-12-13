import styled from '@emotion/styled';
import CourseCard from './CourseCard';
import { coursesQuery, type CourseListParams } from '@apis/courses';
import Button from '@components/actions/Button';
import { useState, useEffect, useRef } from 'react';
import { useShowToast } from '@components/toast/ToastProvider';
import LoadingSpinner from '@components/assets/LoadingSpinner';

type Props = {
  params?: CourseListParams;
};

function CourseCardCheckList({ params }: Props) {
  const showToast = useShowToast();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    coursesQuery.useCoursesInfiniteQuery(params);
  const batchEnrollMutation = coursesQuery.useBatchEnrollMutation();

  const observerTarget = useRef<HTMLDivElement>(null);
  const throttleTimer = useRef<NodeJS.Timeout | null>(null);

  const [selectedCourseIds, setSelectedCourseIds] = useState<Set<number>>(
    new Set()
  );

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

  const handleCheckChange = (courseId: number, checked: boolean) => {
    setSelectedCourseIds(prev => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(courseId);
      } else {
        newSet.delete(courseId);
      }
      return newSet;
    });
  };

  const handleEnroll = () => {
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
            setSelectedCourseIds(new Set());
          } else if (successCount > 0 && failedCount > 0) {
            showToast({
              mode: 'WARN',
              message: `${successCount}개 강의는 신청 완료, ${failedCount}개 강의는 신청 실패했습니다.`,
            });
            const failedIds = new Set(response.failed.map(f => f.courseId));
            setSelectedCourseIds(failedIds);
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
  };

  const allCourses = data.pages.flatMap(page => page.content);
  const availableCount = allCourses.filter(course => !course.isFull).length;
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
      <S.SelectionInfo>
        선택: {selectedCourseIds.size}개 / 로드된 강의: {allCourses.length}개 /
        전체: {totalElements}개 (신청 가능: {availableCount}개)
      </S.SelectionInfo>

      <S.CardGrid>
        {allCourses.map(course => (
          <CourseCard
            key={course.id}
            course={course}
            isCheckable
            isChecked={selectedCourseIds.has(course.id)}
            onCheckChange={handleCheckChange}
          />
        ))}
      </S.CardGrid>

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
    position: sticky;
    display: flex;
    justify-content: center;
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
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: ${({ theme }) => theme.GAP.level6};

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  `,

  EmptyContainer: styled.div`
    width: 100%;
    min-height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;

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

    color: ${({ theme }) => theme.PALETTE.gray[60]};
    font: ${({ theme }) => theme.FONTS.body.small};
    text-align: center;

    background-color: ${({ theme }) => theme.PALETTE.gray[5]};
    border-radius: ${({ theme }) => theme.RADIUS.small};
  `,

  ObserverTarget: styled.div`
    height: 20px;
    width: 100%;
  `,

  LoadingContainer: styled.div`
    width: 100%;
    padding: ${({ theme }) => theme.PADDING.p6};
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  LoadingMessage: styled.p`
    color: ${({ theme }) => theme.PALETTE.gray[70]};
    font: ${({ theme }) => theme.FONTS.body.medium};
  `,
};
