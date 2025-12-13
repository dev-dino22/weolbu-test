import Button from '@components/actions/Button';
import UncontrolledInput from '@components/actions/Input/UncontrolledInput';
import styled from '@emotion/styled';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { ROUTE_PATH } from '@routes/routePath';
import { useShowToast } from '@components/toast/ToastProvider';
import { users } from '@apis/users';
import { ApiError } from '@apis/apiClient';

type LoginFormData = {
  email: string;
  password: string;
};

function LoginPage() {
  const navigate = useNavigate();
  const showToast = useShowToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<LoginFormData> = async data => {
    try {
      await users.postLogin({
        email: data.email,
        password: data.password,
      });

      showToast({
        mode: 'SUCCESS',
        message: '로그인되었습니다!',
      });

      navigate(ROUTE_PATH.COURSE_LIST);
    } catch (error) {
      if (error instanceof ApiError && error.body) {
        const errorMessage = (error.body as { message?: string }).message;
        showToast({
          mode: 'ERROR',
          message: errorMessage || '로그인에 실패했습니다.',
        });
      } else {
        showToast({
          mode: 'ERROR',
          message: '로그인에 실패했습니다. 다시 시도해주세요.',
        });
      }
    }
  };

  return (
    <S.Container>
      <S.Title>로그인</S.Title>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <UncontrolledInput
          label="이메일"
          placeholder="abc@weolbu.com"
          type="email"
          error={!!errors.email}
          feedbackMessage={errors.email?.message}
          {...register('email', {
            required: '이메일을 입력해주세요',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: '올바른 이메일 형식이 아닙니다',
            },
          })}
        />
        <UncontrolledInput
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          type="password"
          error={!!errors.password}
          feedbackMessage={errors.password?.message}
          {...register('password', {
            required: '비밀번호를 입력해주세요',
          })}
        />
        <Button type="submit" size="lg">
          로그인
        </Button>
      </S.Form>
      <S.LinkContainer>
        <S.Description>아직 회원이 아니신가요?</S.Description>
        <S.Link onClick={() => navigate(ROUTE_PATH.SIGN_UP)}>
          회원가입하기
        </S.Link>
      </S.LinkContainer>
    </S.Container>
  );
}

export default LoginPage;

const S = {
  Container: styled.div`
    width: 100%;
    height: 100%;
    min-height: 100vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
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
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level6};
  `,
  LinkContainer: styled.div`
    display: flex;
    gap: ${({ theme }) => theme.GAP.level4};
  `,
  Description: styled.p`
    color: ${({ theme }) => theme.PALETTE.gray[70]};
    font: ${({ theme }) => theme.FONTS.body.medium};
  `,
  Link: styled.button`
    border: none;

    background: none;

    color: ${({ theme }) => theme.PALETTE.primary[50]};
    font: ${({ theme }) => theme.FONTS.body.medium_bold};
    text-decoration: underline;
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.PALETTE.primary[60]};
    }
  `,
};
