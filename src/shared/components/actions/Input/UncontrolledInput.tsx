import styled from '@emotion/styled';
import { type ComponentProps, type ReactNode, useId } from 'react';

type Props = {
  label?: string;
  color?: string;
  feedbackMessage?: ReactNode;
  error?: boolean;
} & ComponentProps<'input'>;

function UncontrolledInput({
  ref,
  placeholder = '입력해 주세요.',
  required,
  label,
  color,
  feedbackMessage = '',
  error = false,
  ...props
}: Props) {
  const inputId = useId();

  return (
    <S.Container>
      <S.InputWrapper error={error}>
        {label && (
          <S.Label htmlFor={inputId} color={color} required={required}>
            {label}
          </S.Label>
        )}
        <S.Input
          ref={ref}
          id={inputId}
          placeholder={placeholder}
          required={required}
          color={color}
          autoComplete="off"
          {...props}
        />
      </S.InputWrapper>
      <S.FeedbackMessage error={error} role="alert" aria-live="polite">
        {feedbackMessage}
      </S.FeedbackMessage>
    </S.Container>
  );
}

UncontrolledInput.displayName = 'UncontrolledInput';

export default UncontrolledInput;

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level3};
  `,
  InputWrapper: styled.div<{ error: boolean }>`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level3};
    position: relative;

    padding: ${({ theme }) => theme.PADDING.p4};

    border: 2px solid
      ${({ theme, error }) =>
        error ? theme.PALETTE.red[40] : theme.PALETTE.gray[5]};

    background-color: ${({ theme }) => theme.PALETTE.gray[5]};
    border-radius: ${({ theme }) => theme.RADIUS.medium};

    &:focus-within {
      border: 2px solid ${({ theme }) => theme.PALETTE.primary[50]};

      background-color: ${({ theme }) => theme.PALETTE.gray[0]};
    }
  `,
  Label: styled.label<{ required?: boolean }>`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level2};

    color: ${({ theme }) => theme.PALETTE.gray[50]};
    font: ${({ theme }) => theme.FONTS.body.small};

    &::after {
      color: ${({ theme }) => theme.PALETTE.red[40]};
      font: ${({ theme }) => theme.FONTS.body.small_bold};
      content: ${({ required }) => (required ? "'*'" : '')};
    }
  `,
  Input: styled.input`
    width: 100%;

    border: none;

    background-color: transparent;

    color: ${({ theme }) => theme.PALETTE.gray[95]};
    font: ${({ theme }) => theme.FONTS.body.medium_bold};

    &::placeholder {
      color: ${({ theme }) => theme.PALETTE.gray[30]};
    }

    &:placeholder-shown {
      color: ${({ theme }) => theme.PALETTE.gray[30]};
    }

    &:focus {
      outline: none;
    }
  `,
  FeedbackMessage: styled.div<{ error: boolean }>`
    height: 14px;

    padding-left: ${({ theme }) => theme.PADDING.p4};

    color: ${({ theme, error }) =>
      error ? theme.PALETTE.red[40] : theme.PALETTE.gray[20]};
    font: ${({ theme }) => theme.FONTS.body.xxsmall};
  `,
};
