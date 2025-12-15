import styled from '@emotion/styled';
import LoginForm from '@domains/auth/components/LoginForm';

function LoginPage() {
  return (
    <S.Container>
      <S.Title>로그인</S.Title>
      <LoginForm />
    </S.Container>
  );
}

export default LoginPage;

const S = {
  Container: styled.div`
    width: 100%;
    height: 100%;
    min-height: 100vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: ${({ theme }) => theme.GAP.level8};

    padding: ${({ theme }) => theme.PADDING.p8};

    background-color: ${({ theme }) => theme.PALETTE.gray[0]};
  `,
  Title: styled.h1`
    color: ${({ theme }) => theme.PALETTE.gray[100]};
    font: ${({ theme }) => theme.FONTS.heading.small};
  `,
};
