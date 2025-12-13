import { THEME } from '@styles/global';

import styled from '@emotion/styled';
import type { ComponentProps, ReactNode } from 'react';

type Props = {
  size?: 'sm' | 'lg';
  variant?: 'filled' | 'outlined';
  children?: ReactNode;
} & ComponentProps<'button'>;

function Button({
  size = 'lg',
  variant = 'filled',
  children,
  ...props
}: Props) {
  return (
    <S.Container size={size} variant={variant} {...props}>
      {children}
    </S.Container>
  );
}

export default Button;

const SIZE = {
  sm: { width: '108px', height: '40px', font: THEME.FONTS.body.medium_bold },
  lg: {
    width: '100%',
    height: '52px',
    font: THEME.FONTS.body.large_bold,
  },
} as const;

const S = {
  Container: styled.button<{
    size: NonNullable<Props['size']>;
    variant: NonNullable<Props['variant']>;
  }>`
    width: ${({ size }) => SIZE[size].width};
    height: ${({ size }) => SIZE[size].height};

    background-color: ${({ theme, variant }) =>
      variant === 'outlined'
        ? theme.PALETTE.gray[0]
        : theme.PALETTE.primary[50]};

    color: ${({ theme, variant }) =>
      variant === 'outlined' ? theme.PALETTE.gray[60] : theme.PALETTE.gray[0]};

    font: ${({ size }) => SIZE[size].font};

    border: ${({ theme, variant }) =>
      variant === 'outlined' ? `1px solid ${theme.PALETTE.gray[40]}` : 'none'};

    border-radius: ${({ theme }) => theme.RADIUS.small};

    &:disabled {
      border: none;

      background-color: ${({ theme }) => theme.PALETTE.gray[20]};

      color: ${({ theme }) => theme.PALETTE.gray[50]};

      cursor: not-allowed;
    }
  `,
};
