import styled from '@emotion/styled';

type RadioGroupProps = {
  children: React.ReactNode;
  legend?: string;
};

type RadioButtonProps = {
  name: string;
  value: string;
  children: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function RadioGroup({ children, legend }: RadioGroupProps) {
  return (
    <S.Fieldset role="radiogroup">
      {legend && <S.Legend>{legend}</S.Legend>}
      <S.RadioList>{children}</S.RadioList>
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

    padding: ${({ theme }) => theme.PADDING.p4};
  `,

  Legend: styled.legend`
    color: ${({ theme }) => theme.PALETTE.gray[50]};
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
    color: #374151;
    font: ${({ theme }) => theme.FONTS.body.medium};

    transition: all 0.2s ease;
  `,
};
