import styled from '@emotion/styled';
import CourseCard from './CourseCard';
import { coursesQuery, type CourseListParams } from '@apis/courses';
import Button from '@components/actions/Button';
import { useState } from 'react';
import { useShowToast } from '@components/toast/ToastProvider';

type Props = {
  params?: CourseListParams;
};

function CourseCardCheckList({ params }: Props) {
  const showToast = useShowToast();
  const { data } = coursesQuery.useCoursesSuspenseQuery();
  const batchEnrollMutation = coursesQuery.useBatchEnrollMutation();

  const [selectedCourseIds, setSelectedCourseIds] = useState<Set<number>>(
    new Set()
  );

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

  if (data.content.length === 0) {
    return (
      <S.EmptyContainer>
        <S.EmptyMessage>등록된 강의가 없습니다.</S.EmptyMessage>
      </S.EmptyContainer>
    );
  }

  return (
    <S.Container>
      <S.CardGrid>
        {data.content.map(course => (
          <CourseCard
            key={course.id}
            course={course}
            isCheckable
            isChecked={selectedCourseIds.has(course.id)}
            onCheckChange={handleCheckChange}
          />
        ))}
      </S.CardGrid>

      {/* TODO: 무한 스크롤로 바꾸기*/}
      <S.PaginationInfo>
        총 {data.totalElements}개의 강의 (페이지 {data.pageable.pageNumber + 1}/
        {data.totalPages})
      </S.PaginationInfo>
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
};
