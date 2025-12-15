import { ApiError } from '@apis/apiClient';
import { coursesQuery } from '@apis/courses';
import Button from '@components/actions/Button';
import { useShowToast } from '@components/toast/ToastProvider';
import { useCallback } from 'react';

type Props = {
  courseId: number;
  isFull: boolean;
};

function CourseEnrollButton({ courseId, isFull }: Props) {
  const showToast = useShowToast();
  const enrollMutation = coursesQuery.useEnrollMutation();

  const handleEnroll = useCallback(() => {
    if (isFull) {
      showToast({ mode: 'ERROR', message: '마감된 강의입니다.' });
      return;
    }

    enrollMutation.mutate(courseId, {
      onSuccess: response => {
        showToast({
          mode: 'SUCCESS',
          message: `"${response.courseTitle}" 수강 신청이 완료되었습니다.`,
        });
      },
      onError: e => {
        if (e instanceof ApiError && e.message) {
          showToast({
            mode: 'ERROR',
            message: e.message,
          });
          return;
        }
        showToast({
          mode: 'ERROR',
          message: '수강 신청 중 오류가 발생했습니다.',
        });
      },
    });
  }, [courseId, isFull, enrollMutation, showToast]);

  return (
    <Button
      onClick={handleEnroll}
      disabled={isFull || enrollMutation.isPending}
    >
      {enrollMutation.isPending
        ? '신청 중...'
        : isFull
        ? '마감된 강의입니다'
        : '수강 신청하기'}
    </Button>
  );
}

export default CourseEnrollButton;
