import ControlledCheckbox from '@components/actions/Input/ControlledCheckbox';
import { memo, useCallback } from 'react';

// TODO: 선택한 강의 이미 신청된 강의면 체크 해제되게하거나
// 그냥 선택 강의 목록 초기화할 트리거..

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
