import Button from '@components/actions/Button';
import { useShowToast } from '@components/toast/ToastProvider';
import { useCallback } from 'react';
import { useCheckCourses } from '../../context/CheckCoursesContext';
import { getEnrollResultMessage } from '../utils/getEnrollResultMessage';
import styled from '@emotion/styled';
import { coursesQuery } from '@apis/queries/coursesQuery';

function BatchEnrollButton() {
  const showToast = useShowToast();
  const batchEnrollMutation = coursesQuery.useBatchEnrollMutation();
  const { selectedCourseIds, clearSelection, setFailedCourses } =
    useCheckCourses();

  const handleEnroll = useCallback(() => {
    if (selectedCourseIds.size === 0) {
      showToast({ mode: 'ERROR', message: '수강 신청할 강의를 선택해주세요.' });
      return;
    }

    batchEnrollMutation.mutate(
      { courseIds: Array.from(selectedCourseIds) },
      {
        onSuccess: response => {
          const result = getEnrollResultMessage(response);

          showToast({ mode: result.mode, message: result.message });

          result.errors.forEach(error => {
            showToast({ mode: 'ERROR', message: error });
          });

          if (result.shouldClear) clearSelection();
          if (result.failedIds.length > 0) setFailedCourses(result.failedIds);
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

  return (
    <S.EnrollButtonBox>
      <Button
        onClick={handleEnroll}
        disabled={selectedCourseIds.size === 0 || batchEnrollMutation.isPending}
      >
        {batchEnrollMutation.isPending
          ? '신청 중...'
          : `${selectedCourseIds.size}개 수강 신청`}
      </Button>
    </S.EnrollButtonBox>
  );
}

export default BatchEnrollButton;

const S = {
  EnrollButtonBox: styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    position: sticky;
    bottom: 24px;
  `,
};
