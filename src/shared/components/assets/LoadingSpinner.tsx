import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

function LoadingSpinner() {
  return (
    <S.Container role="status" aria-live="polite" aria-label="로딩 중">
      <S.Spinner />
      <S.HiddenText>로딩 중...</S.HiddenText>
    </S.Container>
  );
}

export default LoadingSpinner;

const S = {
  Container: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  Spinner: styled.div`
    width: 40px;
    height: 40px;

    border: 4px solid ${({ theme }) => theme.PALETTE.gray[10]};

    animation: ${spin} 1s linear infinite;
    border-radius: 50%;
    border-top: 4px solid ${({ theme }) => theme.PALETTE.primary[50]};
  `,

  HiddenText: styled.span`
    width: 1px;
    height: 1px;
    overflow: hidden;
    position: absolute;

    margin: -1px;
    padding: 0;
    border-width: 0;

    white-space: nowrap;
    clip: rect(0, 0, 0, 0);
  `,
};
