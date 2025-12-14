import styled from '@emotion/styled';
import React, { memo } from 'react';

type Props = {
  id: number | string;
  checked: boolean;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ControlledCheckbox = memo(
  function ControlledCheckbox({ id, checked, disabled, onChange }: Props) {
    return (
      <S.Checkbox
        id={id.toString()}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        onClick={e => e.stopPropagation()}
      />
    );
  },
  (a, b) => a.checked === b.checked && a.disabled === b.disabled
);

export default ControlledCheckbox;

const S = {
  Checkbox: styled.input`
    width: 20px;
    height: 20px;
    cursor: pointer;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  `,
};
