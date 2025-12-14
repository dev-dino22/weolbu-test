import { type CourseListParams } from '@apis/courses';
import styled from '@emotion/styled';
import BatchEnrollButton from './BatchEnrollButton';
import CourseCardInfinityList from '@domains/course/components/courseList/CourseCardInfinityList';
import { CheckCoursesProvider } from '@domains/course/components/courseList/context/CheckCoursesContext';
type Props = {
  params?: CourseListParams;
};

function CourseCardCheckListContent({ params }: Props) {
  return (
    <S.Container>
      <CourseCardInfinityList params={params} />
      <BatchEnrollButton />
    </S.Container>
  );
}

function CourseEnroll({ params }: Props) {
  return (
    <CheckCoursesProvider>
      <CourseCardCheckListContent params={params} />
    </CheckCoursesProvider>
  );
}

export default CourseEnroll;

const S = {
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level6};
  `,

  SelectionInfo: styled.div`
    color: ${({ theme }) => theme.PALETTE.gray[70]};
    font: ${({ theme }) => theme.FONTS.body.medium};
  `,

  ButtonGroup: styled.div`
    display: flex;
    gap: ${({ theme }) => theme.GAP.level3};
  `,

  CardGrid: styled.div`
    width: 100%;
    display: grid;
    gap: ${({ theme }) => theme.GAP.level6};
  `,
};
