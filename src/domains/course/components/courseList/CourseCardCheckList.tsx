import styled from '@emotion/styled';
import { equalByKeys } from '@utils/deepEqual';
import React from 'react';
import { useCheckCourses } from '../../context/CheckCoursesContext';
import CourseCard from './courseCard/CourseCard';
import CourseCheckbox from './courseCard/CourseCheckBox';
import type { CourseListResponse, Course } from '@apis/courses';

type InfiniteQueryData = {
  pages: CourseListResponse[];
  pageParams: unknown[];
};

function CourseCardCheckList({ data }: { data: InfiniteQueryData }) {
  const { selectedCourseIds, toggleSelection } = useCheckCourses();

  type ItemProps = {
    course: Course;
    isChecked: boolean;
    onToggle: (id: number, checked: boolean) => void;
  };

  const CourseListItem = React.memo(
    function CourseListItem({ course, isChecked, onToggle }: ItemProps) {
      return (
        <S.ItemBox>
          <S.CheckboxWrapper>
            <CourseCheckbox
              courseId={course.id}
              checked={isChecked}
              disabled={course.isFull}
              onToggle={onToggle}
            />
          </S.CheckboxWrapper>
          <CourseCard course={course} />
        </S.ItemBox>
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
      {data.pages.map((page, pageIndex: number) =>
        page.content.map((course, courseIndex: number) => {
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

export default CourseCardCheckList;

const S = {
  CardList: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level6};
  `,
  ItemBox: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level4};
  `,
  CheckboxWrapper: styled.div``,
};
