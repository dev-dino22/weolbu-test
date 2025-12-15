import { ROUTE_PATH } from '@routes/routePath';

import styled from '@emotion/styled';
import { useNavigate } from 'react-router';
import { useAuth } from '@domains/auth/context/AuthProvider';

function Header() {
  const navigate = useNavigate();
  const { loggedIn, logoutUser } = useAuth();
  const handleLogoClick = () => {
    navigate(ROUTE_PATH.MAIN);
  };

  const handleLoginClick = () => {
    navigate(ROUTE_PATH.LOGIN);
  };

  return (
    <S.Container>
      <S.LogoWrapper onClick={handleLogoClick} aria-label="홈으로 이동">
        진나영 과제사이트
      </S.LogoWrapper>
      <S.ButtonWrapper>
        {loggedIn ? (
          <S.LoginButton onClick={logoutUser}>로그아웃</S.LoginButton>
        ) : (
          <S.LoginButton onClick={handleLoginClick}>로그인</S.LoginButton>
        )}
      </S.ButtonWrapper>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    width: 100%;
    height: ${({ theme }) => theme.LAYOUT.headerHeight};
    ${({ theme }) => theme.POSITION.fixedCenter};
    display: flex;
    justify-content: space-between;
    align-items: center;
    top: 0;

    padding: ${({ theme }) => theme.PADDING.p5};
    backdrop-filter: blur(12px);
  `,
  LogoWrapper: styled.button`
    color: ${({ theme }) => theme.PALETTE.gray[95]};
    font: ${({ theme }) => theme.FONTS.logo};
  `,
  ButtonWrapper: styled.div`
    display: flex;
    gap: ${({ theme }) => theme.GAP.level3};
  `,

  LoginButton: styled.button`
    border: none;

    background: none;

    color: ${({ theme }) => theme.PALETTE.gray[95]};
    font: ${({ theme }) => theme.FONTS.body.small};
    cursor: pointer;
  `,
};

export default Header;
