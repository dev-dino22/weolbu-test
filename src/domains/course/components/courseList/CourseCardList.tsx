import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import CourseCard from './CourseCard';
import { equalByKeys } from '@utils/deepEqual';
import CourseCheckbox from './CourseCheckBox';

function CourseCardList({
  data,
  setSelectedCourseId,
  setSelectedCourseIds,
  selectedCourseIds,
  handleOpenModal,
}: any) {
  const toggleSelection = useCallback(
    (courseId: number, checked: boolean) => {
      setSelectedCourseIds((prev: Set<number>) => {
        const newSet = new Set(prev);
        if (checked) newSet.add(courseId);
        else newSet.delete(courseId);
        return newSet;
      });
    },
    [setSelectedCourseIds]
  );

  const handleCardClick = useCallback(
    (courseId: number) => {
      setSelectedCourseId(courseId);
      handleOpenModal();
    },
    [setSelectedCourseId, handleOpenModal]
  );

  type ItemProps = {
    course: any;
    isChecked: boolean;
    onToggle: (id: number, checked: boolean) => void;
    onCardClick: (id: number) => void;
  };

  const CourseListItem = React.memo(
    function CourseListItem({
      course,
      isChecked,
      onToggle,
      onCardClick,
    }: ItemProps) {
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
            onClick={onCardClick}
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
              onCardClick={handleCardClick}
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
