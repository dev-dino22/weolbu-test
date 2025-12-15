import styled from '@emotion/styled';
import React, { memo } from 'react';

type Props = {
  id: number | string;
  checked: boolean;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  'aria-label'?: string;
};

const ControlledCheckbox = memo(
  function ControlledCheckbox({
    id,
    checked,
    disabled,
    onChange,
    label,
    'aria-label': ariaLabel,
  }: Props) {
    const inputId = `checkbox-${id}`;
    return (
      <S.Container>
        <S.Checkbox
          id={inputId}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          onClick={e => e.stopPropagation()}
          aria-label={ariaLabel || label}
        />
        {label && <S.Label htmlFor={inputId}>{label}</S.Label>}
      </S.Container>
    );
  },
  (a, b) => a.checked === b.checked && a.disabled === b.disabled
);

export default ControlledCheckbox;

const S = {
  Container: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level2};
  `,
  Checkbox: styled.input`
    width: 20px;
    height: 20px;
    cursor: pointer;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  `,
  Label: styled.label`
    width: 1px;
    height: 1px;
    overflow: hidden;
    position: absolute;

    margin: -1px;
    padding: 0;
    border-width: 0;

    white-space: nowrap;
    clip: rect(0, 0, 0, 0);
    cursor: pointer;
    user-select: none;
  `,
};
