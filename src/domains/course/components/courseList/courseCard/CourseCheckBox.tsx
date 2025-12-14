import ControlledCheckbox from '@components/actions/Input/ControlledCheckbox';
import { memo, useCallback } from 'react';

const CourseCheckbox = memo(
  function CourseCheckbox({
    courseId,
    checked,
    disabled,
    onToggle,
  }: {
    courseId: number;
    checked: boolean;
    disabled?: boolean;
    onToggle: (id: number, checked: boolean) => void;
  }) {
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
      />
    );
  },
  (a, b) => a.checked === b.checked && a.disabled === b.disabled
);

export default CourseCheckbox;
