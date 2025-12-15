import type { BatchEnrollResponse } from '@apis/courses';

type EnrollResultMessage = {
  mode: 'SUCCESS' | 'WARN' | 'ERROR';
  message: string;
  shouldClear: boolean;
  failedIds: number[];
  errors: string[];
};

export const getEnrollResultMessage = (
  response: BatchEnrollResponse
): EnrollResultMessage => {
  const successCount = response.success.length;
  const failedCount = response.failed.length;
  const hasSuccess = successCount > 0;
  const hasFailed = failedCount > 0;

  const errors = hasFailed
    ? response.failed.map(f => `강의 ID ${f.courseId}: ${f.reason}`)
    : [];

  if (hasSuccess && !hasFailed) {
    return {
      mode: 'SUCCESS',
      message: `${successCount}개 강의 수강 신청이 완료되었습니다.`,
      shouldClear: true,
      failedIds: [],
      errors: [],
    };
  }

  if (hasSuccess && hasFailed) {
    return {
      mode: 'WARN',
      message: `${successCount}개 강의는 신청 완료, ${failedCount}개 강의는 신청 실패했습니다.`,
      shouldClear: false,
      failedIds: response.failed.map(f => f.courseId),
      errors,
    };
  }

  return {
    mode: 'ERROR',
    message: '모든 강의 수강 신청에 실패했습니다.',
    shouldClear: false,
    failedIds: [],
    errors,
  };
};
