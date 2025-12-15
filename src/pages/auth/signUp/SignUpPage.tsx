import SignUpForm from '@domains/auth/components/SignupForm';
import styled from '@emotion/styled';

function SignUpPage() {
  return (
    <S.Container>
      <S.Title>회원 가입</S.Title>
      <SignUpForm />
    </S.Container>
  );
}

export default SignUpPage;

const S = {
  Container: styled.div`
    width: 100%;
    height: 100%;
    min-height: 100vh;

    display: flex;
    flex-direction: column;
    align-items: center;

    gap: ${({ theme }) => theme.GAP.level8};

    padding: ${({ theme }) => theme.LAYOUT.headerHeight}
      ${({ theme }) => theme.PADDING.p8};
  `,
  Title: styled.h1`
    color: ${({ theme }) => theme.PALETTE.gray[100]};
    font: ${({ theme }) => theme.FONTS.heading.small};
  `,
};
