import styled from '@emotion/styled';
import { coursesQuery } from '@apis/courses';
import { formatter } from '@validation/formatters';
import CourseEnrollButton from './CourseEnrollButton';
import FullBadge from '@domains/course/components/courseList/courseCard/FullBadge';

type Props = {
  courseId: number;
};

function CourseDetail({ courseId }: Props) {
  const { data: course } = coursesQuery.useCourseDetailSuspenseQuery(courseId);

  return (
    <S.Container>
      <S.Header>
        <S.TitleSection>
          {course.isFull && <FullBadge />}
          <S.Title>{course.title}</S.Title>
        </S.TitleSection>
        <S.Price>{formatter.toPrice(course.price)}원</S.Price>
      </S.Header>
      <S.Wrapper>
        {course.description && (
          <S.DescriptionSection>
            <S.SectionTitle>강의 소개</S.SectionTitle>
            <S.Description>{course.description}</S.Description>
          </S.DescriptionSection>
        )}

        <S.InfoSection>
          <S.SectionTitle>강의 정보</S.SectionTitle>
          <S.InfoGrid>
            <S.InfoItem>
              <S.InfoLabel>강사</S.InfoLabel>
              <S.InfoValue>{course.instructorName}</S.InfoValue>
            </S.InfoItem>

            <S.InfoItem>
              <S.InfoLabel>수강 인원</S.InfoLabel>
              <S.InfoValue>
                <S.CurrentStudents>{course.currentStudents}</S.CurrentStudents>
                <S.Separator>/</S.Separator>
                <S.MaxStudents>{course.maxStudents}명</S.MaxStudents>
              </S.InfoValue>
            </S.InfoItem>

            <S.InfoItem>
              <S.InfoLabel>잔여 석</S.InfoLabel>
              <S.InfoValue>
                <S.AvailableSeats>{course.availableSeats}석</S.AvailableSeats>
              </S.InfoValue>
            </S.InfoItem>

            <S.InfoItem>
              <S.InfoLabel>개설일</S.InfoLabel>
              <S.InfoValue>{formatter.toDate(course.createdAt)}</S.InfoValue>
            </S.InfoItem>
          </S.InfoGrid>
        </S.InfoSection>

        <S.ButtonWrapper>
          <CourseEnrollButton courseId={course.id} isFull={course.isFull} />
        </S.ButtonWrapper>
      </S.Wrapper>
    </S.Container>
  );
}

export default CourseDetail;

const S = {
  Container: styled.div`
    width: 100%;
    max-width: 800px;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level7};

    margin: 0 auto;

    padding: ${({ theme }) => theme.PADDING.p8};

    background-color: ${({ theme }) => theme.PALETTE.gray[0]};
  `,

  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level4};
    overflow-y: auto;
  `,

  Header: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: ${({ theme }) => theme.GAP.level4};

    padding-bottom: ${({ theme }) => theme.PADDING.p6};
    border-bottom: 2px solid ${({ theme }) => theme.PALETTE.gray[10]};
  `,

  TitleSection: styled.div`
    display: flex;
    flex: 1;
    align-items: flex-start;
    gap: ${({ theme }) => theme.GAP.level3};
  `,

  Title: styled.h1`
    color: ${({ theme }) => theme.PALETTE.gray[100]};
    font: ${({ theme }) => theme.FONTS.heading.small};
  `,

  FullBadge: styled.span`
    padding: 4px 12px;

    background-color: ${({ theme }) => theme.PALETTE.gray[30]};

    color: ${({ theme }) => theme.PALETTE.gray[0]};
    font: ${({ theme }) => theme.FONTS.body.xsmall_bold};
    border-radius: ${({ theme }) => theme.RADIUS.small};
  `,

  Price: styled.div`
    color: ${({ theme }) => theme.PALETTE.primary[60]};
    font: ${({ theme }) => theme.FONTS.heading.small};
    white-space: nowrap;
  `,

  DescriptionSection: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level4};
  `,

  SectionTitle: styled.h2`
    color: ${({ theme }) => theme.PALETTE.gray[90]};
    font: ${({ theme }) => theme.FONTS.body.large_bold};
  `,

  Description: styled.p`
    color: ${({ theme }) => theme.PALETTE.gray[70]};
    font: ${({ theme }) => theme.FONTS.body.medium};
    white-space: pre-wrap;
    line-height: 1.8;
    overflow-wrap: break-word;
  `,

  InfoSection: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level4};
  `,

  InfoGrid: styled.div`
    display: grid;
    gap: ${({ theme }) => theme.GAP.level5};
    grid-template-columns: repeat(2, 1fr);

    @media (width <= 768px) {
      grid-template-columns: 1fr;
    }
  `,

  InfoItem: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level2};

    padding: ${({ theme }) => theme.PADDING.p4};

    background-color: ${({ theme }) => theme.PALETTE.gray[5]};
    border-radius: ${({ theme }) => theme.RADIUS.medium};
  `,

  InfoLabel: styled.span`
    color: ${({ theme }) => theme.PALETTE.gray[50]};
    font: ${({ theme }) => theme.FONTS.body.small};
  `,

  InfoValue: styled.span`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level2};

    color: ${({ theme }) => theme.PALETTE.gray[90]};
    font: ${({ theme }) => theme.FONTS.body.medium_bold};
  `,

  CurrentStudents: styled.span`
    color: ${({ theme }) => theme.PALETTE.primary[50]};
  `,

  Separator: styled.span`
    color: ${({ theme }) => theme.PALETTE.gray[30]};
  `,

  MaxStudents: styled.span`
    color: ${({ theme }) => theme.PALETTE.gray[70]};
  `,

  AvailableSeats: styled.span`
    color: ${({ theme }) => theme.PALETTE.primary[50]};
  `,

  ButtonWrapper: styled.div`
    height: 52px;
  `,
};
