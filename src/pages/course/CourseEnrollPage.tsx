import Button from '@components/actions/Button';
import styled from '@emotion/styled';
import { ROUTE_PATH } from '@routes/routePath';
import { useNavigate } from 'react-router';
import CourseCardList from '@domains/course/components/CourseCardList';
import ErrorBoundary from '@domains/errorboundary/ErrorBoundary';
import { Suspense } from 'react';
import LoadingSpinner from '@components/assets/LoadingSpinner';

function CourseEnrollPage() {
  const navigate = useNavigate();

  return (
    <S.Container>
      <S.Header>
        <S.Title>강의 목록</S.Title>
        <Button onClick={() => navigate(ROUTE_PATH.COURSE_CREATE)}>
          강의 등록하기
        </Button>
      </S.Header>
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <CourseCardList />
        </Suspense>
      </ErrorBoundary>
    </S.Container>
  );
}

export default CourseEnrollPage;

const S = {
  Container: styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level6};
    padding: ${({ theme }) => theme.LAYOUT.headerHeight}
      ${({ theme }) => theme.PADDING.p8};
  `,
  Header: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level4};
  `,
  Title: styled.h1`
    color: ${({ theme }) => theme.PALETTE.gray[100]};
    font: ${({ theme }) => theme.FONTS.heading.small};
  `,
};
