import styled from '@emotion/styled';
import { type ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

function Layout({ children }: Props) {
  return (
    <S.Container>
      <S.Wrapper>{children}</S.Wrapper>
    </S.Container>
  );
}

export default Layout;

const S = {
  Container: styled.div`
    width: 100%;
    height: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
  `,
  Wrapper: styled.div`
    width: 100%;
    max-width: ${({ theme }) => theme.LAYOUT.maxWidth};
    min-height: 100vh;
  `,
};
