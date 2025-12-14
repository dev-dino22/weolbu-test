import styled from '@emotion/styled';
import CourseCard from './CourseCard';
import { coursesQuery, type CourseListParams } from '@apis/courses';
import { useNavigate } from 'react-router';
import { ROUTE_PATH } from '@routes/routePath';

type Props = {
  params?: CourseListParams;
};

function CourseCardList({ params }: Props) {
  const navigate = useNavigate();
  const { data } = coursesQuery.useCoursesSuspenseQuery();

  const handleEnrollClick = (courseId: number) => {
    navigate(`${ROUTE_PATH.COURSE_ENROLL}?courseId=${courseId}`);
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
            onEnrollClick={handleEnrollClick}
          />
        ))}
      </S.CardGrid>
      <S.PaginationInfo>
        총 {data.totalElements}개의 강의 (페이지 {data.pageable.pageNumber + 1}/
        {data.totalPages})
      </S.PaginationInfo>
    </S.Container>
  );
}

export default CourseCardList;

const S = {
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level6};
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
};
