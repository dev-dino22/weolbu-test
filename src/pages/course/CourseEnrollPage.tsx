import Button from '@components/actions/Button';
import LoadingSpinner from '@components/assets/LoadingSpinner';
import CourseCardCheckList from '@domains/course/components/CourseCardCheckList';
import ErrorBoundary from '@domains/errorboundary/ErrorBoundary';
import styled from '@emotion/styled';
import { ROUTE_PATH } from '@routes/routePath';
import { Suspense, useState } from 'react';
import { useNavigate } from 'react-router';
import type { CourseSortType } from '@apis/courses';
import {
  RadioButton,
  RadioGroup,
} from '@components/actions/Input/UncontrolledRadio';

function CourseEnrollPage() {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState<CourseSortType>('recent');

  const handleSortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSortType(e.target.value as CourseSortType);
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title>강의 목록</S.Title>
        <S.HeaderRight>
          <Button
            variant="outlined"
            size="sm"
            onClick={() => navigate(ROUTE_PATH.COURSE_CREATE)}
          >
            + 강의 등록
          </Button>
        </S.HeaderRight>
      </S.Header>
      <S.ListContainer>
        <RadioGroup>
          <RadioButton
            name="sortType"
            value="recent"
            checked={sortType === 'recent'}
            onChange={handleSortChange}
          >
            최신순
          </RadioButton>
          <RadioButton
            name="sortType"
            value="popular"
            checked={sortType === 'popular'}
            onChange={handleSortChange}
          >
            인기순
          </RadioButton>
          <RadioButton
            name="sortType"
            value="rate"
            checked={sortType === 'rate'}
            onChange={handleSortChange}
          >
            신청률순
          </RadioButton>
        </RadioGroup>
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <CourseCardCheckList params={{ sort: sortType }} />
          </Suspense>
        </ErrorBoundary>
      </S.ListContainer>
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
  HeaderRight: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level3};
  `,
  Title: styled.h1`
    color: ${({ theme }) => theme.PALETTE.gray[100]};
    font: ${({ theme }) => theme.FONTS.heading.small};
  `,
  ListContainer: styled.div``,
};
