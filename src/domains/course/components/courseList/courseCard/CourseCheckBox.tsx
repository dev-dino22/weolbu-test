import ControlledCheckbox from '@components/actions/Input/ControlledCheckbox';
import React, { useCallback } from 'react';

type Props = {
  courseId: number;
  checked: boolean;
  disabled?: boolean;
  onToggle: (id: number, checked: boolean) => void;
  courseTitle: string;
};

function CourseCheckbox({
  courseId,
  checked,
  disabled,
  onToggle,
  courseTitle,
}: Props) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.stopPropagation();
      onToggle(courseId, e.target.checked);
    },
    [onToggle, courseId]
  );

  return (
    <ControlledCheckbox
      checked={checked}
      onChange={handleChange}
      disabled={disabled}
      id={courseId}
      aria-label={`${courseTitle} 강의 선택`}
    />
  );
}

CourseCheckbox.displayName = 'CourseCheckbox';

export default React.memo(
  CourseCheckbox,
  (prev, next) =>
    prev.checked === next.checked && prev.disabled === next.disabled
);
