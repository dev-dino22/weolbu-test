import Button from '@components/actions/Button';
import styled from '@emotion/styled';
import { ROUTE_PATH } from '@routes/routePath';
import { useNavigate } from 'react-router';

function MainPage() {
  const navigate = useNavigate();

  return (
    <S.Container>
      <S.Title>월부 수강신청</S.Title>
      <S.Description>
        안녕하세요, 월급쟁이부자들 FE 에 지원한 진나영입니다😊 <br />
        과제 기회를 주셔서 감사합니다. 과제 사이트 제출합니다!
      </S.Description>
      <Button onClick={() => navigate(ROUTE_PATH.LOGIN)}>
        이메일로 시작하기
      </Button>
    </S.Container>
  );
}

export default MainPage;

const S = {
  Container: styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level4};

    padding: ${({ theme }) => theme.PADDING.p8};
  `,
  Title: styled.h1`
    color: ${({ theme }) => theme.PALETTE.gray[100]};
    font: ${({ theme }) => theme.FONTS.heading.small};
  `,
  Description: styled.p`
    color: ${({ theme }) => theme.PALETTE.gray[70]};
    font: ${({ theme }) => theme.FONTS.body.medium};
  `,
};
