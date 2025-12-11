import Button from '@components/actions/Button';

import styled from '@emotion/styled';
import React from 'react';

type Props = { children: React.ReactNode };
type State = { hasError: boolean };

class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <S.Container>
          <S.Wrapper>
            <S.Title>오류가 발생했습니다.</S.Title>
            <S.Description>죄송합니다. 다시 시도해 주세요.</S.Description>
            <Button onClick={() => window.location.reload()}>새로고침</Button>
          </S.Wrapper>
        </S.Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

const S = {
  Container: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  Wrapper: styled.div`
    width: 300px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level4};
  `,
  Title: styled.h1`
    font: ${({ theme }) => theme.FONTS.heading.medium};
  `,
  Description: styled.p``,
};
