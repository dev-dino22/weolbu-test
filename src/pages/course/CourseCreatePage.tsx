import styled from '@emotion/styled';
import CourseCreateForm from '@domains/course/create/CourseCreateForm';

function CourseCreatePage() {
  return (
    <S.Container>
      <S.Title>강의 개설</S.Title>
      <CourseCreateForm />
    </S.Container>
  );
}

export default CourseCreatePage;

const S = {
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    gap: ${({ theme }) => theme.GAP.level8};

    padding: ${({ theme }) => theme.LAYOUT.headerHeight}
      ${({ theme }) => theme.PADDING.p8};

    background-color: ${({ theme }) => theme.PALETTE.gray[0]};
  `,
  Title: styled.h1`
    color: ${({ theme }) => theme.PALETTE.gray[100]};
    font: ${({ theme }) => theme.FONTS.heading.small};
  `,
};
