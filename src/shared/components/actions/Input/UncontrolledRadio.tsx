import styled from '@emotion/styled';

type RadioGroupProps = {
  children: React.ReactNode;
  legend?: string;
  errorMessage?: string;
};

type RadioButtonProps = {
  name: string;
  value: string;
  children: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function RadioGroup({
  children,
  legend,
  errorMessage = '',
}: RadioGroupProps) {
  return (
    <S.Fieldset role="radiogroup">
      {legend && <S.Legend>{legend}</S.Legend>}
      <S.RadioList>{children}</S.RadioList>
      <S.ErrorMessage role="alert" aria-live="assertive">
        {errorMessage}
      </S.ErrorMessage>
    </S.Fieldset>
  );
}

export function RadioButton({
  name,
  value,
  children,
  ...props
}: RadioButtonProps) {
  return (
    <S.Label>
      <S.RadioInput type="radio" name={name} value={value} {...props} />
      <S.RadioText>{children}</S.RadioText>
    </S.Label>
  );
}

const S = {
  Fieldset: styled.fieldset`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level3};
  `,

  Legend: styled.legend`
    color: ${({ theme }) => theme.PALETTE.gray[70]};
    font: ${({ theme }) => theme.FONTS.body.small};
  `,

  RadioList: styled.div`
    width: 100%;
    display: flex;
    gap: ${({ theme }) => theme.GAP.level3};
  `,

  Label: styled.label`
    width: 100%;
    height: 52px;
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 12px 24px;

    background-color: ${({ theme }) => theme.PALETTE.gray[5]};

    transition: all 0.2s ease;
    border-radius: 8px;

    cursor: pointer;

    &:has(input:checked) {
      border-color: #3b82f6;

      background-color: #3b82f6;
    }

    &:has(input:checked) span {
      color: #fff;
      font: ${({ theme }) => theme.FONTS.body.small_bold};
    }

    &:has(input:focus-visible) {
      outline: 2px solid #3b82f6;
      outline-offset: 2px;
    }

    &:has(input:disabled) {
      background-color: ${({ theme }) => theme.PALETTE.gray[10]};
      cursor: not-allowed;
    }
  `,

  RadioInput: styled.input`
    width: 1px;
    height: 1px;
    overflow: hidden;
    position: absolute;

    margin: -1px;
    padding: 0;
    border-width: 0;

    white-space: nowrap;
  `,

  RadioText: styled.span`
    color: ${({ theme }) => theme.PALETTE.gray[70]};
    font: ${({ theme }) => theme.FONTS.body.medium};

    transition: all 0.2s ease;
  `,

  ErrorMessage: styled.p`
    height: 14px;

    color: ${({ theme }) => theme.PALETTE.red[40]};
    font: ${({ theme }) => theme.FONTS.body.xxsmall};
  `,
};
