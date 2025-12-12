import Button from '@components/actions/Button';
import UncontrolledInput from '@components/actions/Input/UncontrolledInput';
import {
  RadioButton,
  RadioGroup,
} from '@components/actions/Input/UncontrolledRadio';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';

function SignUpPage() {
  const { register, handleSubmit } = useForm();
  return (
    <S.Container>
      <S.Title>회원 가입</S.Title>
      <S.Form onSubmit={handleSubmit(data => console.log(data))}>
        <UncontrolledInput label="이름" placeholder="김월부" />
        <UncontrolledInput
          label="이메일"
          placeholder="abc@weolbu.com"
          type="email"
        />
        <UncontrolledInput
          label="휴대폰 번호"
          placeholder="010-1234-5678"
          type="tel"
        />
        <UncontrolledInput
          label="비밀번호"
          placeholder="영문, 숫자, 특수문자 포함 8자 이상"
          type="password"
        />
        <RadioGroup legend="수강 신청 유형">
          <RadioButton value="student" {...register('userType')}>
            수강생
          </RadioButton>
          <RadioButton value="instructor" {...register('userType')}>
            강사
          </RadioButton>
        </RadioGroup>
      </S.Form>
      <Button type="submit" size="lg">
        회원 가입
      </Button>
    </S.Container>
  );
}

export default SignUpPage;

const S = {
  Container: styled.div`
    width: 100%;
    height: 100%;
    min-height: 100vh;

    display: flex;
    flex-direction: column;
    align-items: center;

    gap: ${({ theme }) => theme.GAP.level8};

    padding: ${({ theme }) => theme.PADDING.p8};

    background-color: ${({ theme }) => theme.PALETTE.gray[0]};
  `,
  Title: styled.h1`
    color: ${({ theme }) => theme.PALETTE.gray[100]};
    font: ${({ theme }) => theme.FONTS.heading.small};
  `,
  Form: styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level6};
  `,
};
