import ControlledCheckbox from '@components/actions/Input/ControlledCheckbox';
import { memo, useCallback } from 'react';

const CourseCheckbox = memo(
  function CourseCheckbox({
    courseId,
    checked,
    disabled,
    onToggle,
    courseTitle,
  }: {
    courseId: number;
    checked: boolean;
    disabled?: boolean;
    onToggle: (id: number, checked: boolean) => void;
    courseTitle: string;
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
        aria-label={`${courseTitle} 강의 선택`}
      />
    );
  },
  (a, b) => a.checked === b.checked && a.disabled === b.disabled
);

export default CourseCheckbox;
