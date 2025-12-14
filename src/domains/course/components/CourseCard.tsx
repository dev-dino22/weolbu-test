import type { Course } from '@apis/courses';
import styled from '@emotion/styled';

type Props = {
  course: Course;
  isCheckable?: boolean;
  isChecked?: boolean;
  onCheckChange?: (courseId: number, checked: boolean) => void;
  onEnrollClick?: (courseId: number) => void;
};

function CourseCard({
  course,
  isCheckable,
  isChecked,
  onCheckChange,
  onEnrollClick,
}: Props) {
  const {
    id,
    title,
    description,
    instructorName,
    maxStudents,
    currentStudents,
    isFull,
    price,
  } = course;

  return (
    <S.Container>
      {isCheckable && (
        <S.CheckboxWrapper>
          <S.Checkbox
            type="checkbox"
            checked={isChecked}
            onChange={e => onCheckChange?.(id, e.target.checked)}
            disabled={isFull}
          />
        </S.CheckboxWrapper>
      )}
      <S.Wrapper>
        <S.Header>
          <S.Title>
            {isFull && <S.FullBadge>마감</S.FullBadge>}
            {title}
          </S.Title>
          <S.HeaderRight>
            <S.Price>{price.toLocaleString('ko-KR')}원</S.Price>
          </S.HeaderRight>
        </S.Header>

        {description && <S.Description>{description}</S.Description>}

        <S.InfoSection>
          <S.InfoBox>
            <S.InfoLabel>강사</S.InfoLabel>
            <S.InfoValue>{instructorName}</S.InfoValue>
          </S.InfoBox>

          <S.InfoBox>
            <S.InfoLabel>수강 인원</S.InfoLabel>
            <S.InfoValue>
              <S.CurrentStudents>{currentStudents}</S.CurrentStudents>
              <S.Separator>/</S.Separator>
              <S.MaxStudents>{maxStudents}명</S.MaxStudents>
            </S.InfoValue>
          </S.InfoBox>
        </S.InfoSection>
      </S.Wrapper>
    </S.Container>
  );
}

export default CourseCard;

const S = {
  Container: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level4};
  `,

  Wrapper: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level5};
    justify-content: space-between;
    position: relative;

    padding: ${({ theme }) => theme.PADDING.p6};

    background-color: ${({ theme }) => theme.PALETTE.gray[0]};
    border: 1px solid ${({ theme }) => theme.PALETTE.gray[10]};
    border-radius: ${({ theme }) => theme.RADIUS.medium};

    transition: all 0.2s ease;

    &:hover {
      border-color: ${({ theme }) => theme.PALETTE.primary[30]};
      box-shadow: ${({ theme }) => theme.BOX_SHADOW.level1};
    }
  `,

  Header: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${({ theme }) => theme.GAP.level3};
  `,

  Title: styled.h3`
    color: ${({ theme }) => theme.PALETTE.gray[100]};
    font: ${({ theme }) => theme.FONTS.body.large_bold};
    flex: 1;
    display: flex;
    gap: ${({ theme }) => theme.GAP.level2};
    align-items: center;
  `,

  HeaderRight: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level3};
  `,

  FullBadge: styled.span`
    padding: 4px 12px;

    background-color: ${({ theme }) => theme.PALETTE.gray[30]};

    color: ${({ theme }) => theme.PALETTE.gray[0]};
    font: ${({ theme }) => theme.FONTS.body.xsmall_bold};

    border-radius: ${({ theme }) => theme.RADIUS.small};
  `,

  Description: styled.p`
    color: ${({ theme }) => theme.PALETTE.gray[70]};
    font: ${({ theme }) => theme.FONTS.body.medium};
    line-height: 1.5;
  `,

  InfoSection: styled.div`
    display: flex;
    gap: ${({ theme }) => theme.GAP.level3};
  `,

  InfoBox: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level4};
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
    font: ${({ theme }) => theme.FONTS.body.medium};
  `,

  CurrentStudents: styled.span`
    color: ${({ theme }) => theme.PALETTE.primary[50]};
    font: ${({ theme }) => theme.FONTS.body.medium_bold};
  `,

  Separator: styled.span`
    color: ${({ theme }) => theme.PALETTE.gray[30]};
  `,

  MaxStudents: styled.span`
    color: ${({ theme }) => theme.PALETTE.gray[70]};
  `,
  Price: styled.span`
    color: ${({ theme }) => theme.PALETTE.primary[50]};
    font: ${({ theme }) => theme.FONTS.body.large_bold};
  `,

  CheckboxWrapper: styled.div``,

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
