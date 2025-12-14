import styled from '@emotion/styled';
import { equalByKeys } from '@utils/deepEqual';
import React from 'react';
import { useCheckCourses } from '../../context/CheckCoursesContext';
import CourseCard from './CourseCard';
import CourseCheckbox from './CourseCheckBox';

function CourseCardList({ data }: { data: any }) {
  const { selectedCourseIds, toggleSelection } = useCheckCourses();

  type ItemProps = {
    course: any;
    isChecked: boolean;
    onToggle: (id: number, checked: boolean) => void;
  };

  const CourseListItem = React.memo(
    function CourseListItem({ course, isChecked, onToggle }: ItemProps) {
      return (
        <div>
          <S.CheckboxWrapper>
            <CourseCheckbox
              courseId={course.id}
              checked={isChecked}
              disabled={course.isFull}
              onToggle={onToggle}
            />
          </S.CheckboxWrapper>

          <CourseCard
            course={course}
            isChecked={isChecked}
            onCheckChange={onToggle}
          />
        </div>
      );
    },
    (prev, next) => {
      if (
        !equalByKeys(prev.course, next.course, [
          'id',
          'currentStudents',
          'isFull',
          'price',
        ])
      )
        return false;
      return true;
    }
  );

  return (
    <S.CardList>
      {data.pages.map((page: any, pageIndex: number) =>
        page.content.map((course: any, courseIndex: number) => {
          const key = `${pageIndex}-${course.id}-${courseIndex}`;
          const isChecked = selectedCourseIds.has(course.id);
          return (
            <CourseListItem
              key={key}
              course={course}
              isChecked={isChecked}
              onToggle={toggleSelection}
            />
          );
        })
      )}
    </S.CardList>
  );
}

export default CourseCardList;

const S = {
  CardList: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level6};
  `,
  CheckboxWrapper: styled.div``,
};
