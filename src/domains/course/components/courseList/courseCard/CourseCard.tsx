import React, { Suspense } from 'react';
import type { Course } from '@apis/courses';
import styled from '@emotion/styled';
import ErrorBoundary from '@domains/errorboundary/ErrorBoundary';
import LoadingSpinner from '@components/assets/LoadingSpinner';
import Modal from '@components/modal/Modal';
import CourseDetail from '@domains/course/detail/components/CourseDetail';
import { useModal } from '@components/modal/useModal';
import { equalByKeys } from '@utils/deepEqual';
import FullBadge from './FullBadge';

type Props = {
  course: Course;
};

function CourseCard({ course }: Props) {
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

  const { mounted, opened, handleOpenModal, handleUnmountModal } = useModal();

  return (
    <>
      <S.Container>
        <S.Wrapper onClick={handleOpenModal}>
          <S.Header>
            <S.Title>
              {isFull && <FullBadge />}
              <S.TitleText>{title}</S.TitleText>
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
      <Modal
        mounted={mounted}
        opened={opened}
        onClose={handleUnmountModal}
        onUnmount={handleUnmountModal}
        size="lg"
      >
        <ErrorBoundary>
          <Suspense
            fallback={
              <S.LoadingBox>
                <LoadingSpinner />
              </S.LoadingBox>
            }
          >
            <CourseDetail courseId={id} />
          </Suspense>
        </ErrorBoundary>
      </Modal>
    </>
  );
}

export default React.memo(CourseCard, (prev: Props, next: Props) =>
  equalByKeys(prev.course, next.course, [
    'id',
    'currentStudents',
    'isFull',
    'price',
  ])
);

const S = {
  Container: styled.div`
    min-width: 0;
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level4};
  `,

  Wrapper: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: ${({ theme }) => theme.GAP.level5};
    position: relative;

    padding: ${({ theme }) => theme.PADDING.p6};
    border: 1px solid ${({ theme }) => theme.PALETTE.gray[10]};

    background-color: ${({ theme }) => theme.PALETTE.gray[0]};

    transition: all 0.2s ease;
    border-radius: ${({ theme }) => theme.RADIUS.medium};
    cursor: pointer;

    &:hover {
      border-color: ${({ theme }) => theme.PALETTE.primary[30]};
      box-shadow: ${({ theme }) => theme.BOX_SHADOW.level1};
    }
  `,

  Header: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level3};
  `,

  Title: styled.div`
    min-width: 0;
    display: flex;
    flex: 1;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level2};

    color: ${({ theme }) => theme.PALETTE.gray[100]};
    font: ${({ theme }) => theme.FONTS.body.large_bold};
  `,

  TitleText: styled.span`
    min-width: 0;
    flex: 1;
    overflow: hidden;

    white-space: nowrap;
    text-overflow: ellipsis;
  `,

  HeaderRight: styled.div`
    display: flex;
    flex-shrink: 0;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level3};
  `,
  Description: styled.p`
    color: ${({ theme }) => theme.PALETTE.gray[70]};
    font: ${({ theme }) => theme.FONTS.body.medium};
    line-height: 1.5;
    overflow-wrap: break-word;
  `,

  InfoSection: styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: ${({ theme }) => theme.GAP.level3};
  `,

  InfoBox: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level4};

    white-space: nowrap;
  `,

  InfoLabel: styled.span`
    color: ${({ theme }) => theme.PALETTE.gray[70]};
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
    white-space: nowrap;
  `,
  LoadingBox: styled.div`
    width: 100%;
    height: 80vh;
  `,
};
