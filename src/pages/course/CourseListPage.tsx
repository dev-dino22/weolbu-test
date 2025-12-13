import Button from '@components/actions/Button';
import styled from '@emotion/styled';
import { ROUTE_PATH } from '@routes/routePath';
import { useNavigate } from 'react-router';

function CourseListPage() {
  const navigate = useNavigate();

  return (
    <S.Container>
      <S.Title>강의 목록</S.Title>
      <Button onClick={() => navigate(ROUTE_PATH.COURSE_CREATE)}>
        강의 등록하기
      </Button>
    </S.Container>
  );
}

export default CourseListPage;

const S = {
  Container: styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level4};

    padding: ${({ theme }) => theme.PADDING.p8};
  `,
  Title: styled.h1`
    color: ${({ theme }) => theme.PALETTE.gray[100]};
    font: ${({ theme }) => theme.FONTS.heading.small};
  `,
};
