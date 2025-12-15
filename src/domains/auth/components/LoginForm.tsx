import Button from '@components/actions/Button';
import UncontrolledInput from '@components/actions/Input/UncontrolledInput';
import styled from '@emotion/styled';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { ROUTE_PATH } from '@routes/routePath';
import { useShowToast } from '@components/toast/ToastProvider';
import { ApiError } from '@apis/apiClient';
import { useAuth } from '@domains/auth/context/AuthProvider';
import { loginFormRules } from '@domains/auth/validation';

type LoginFormData = {
  email: string;
  password: string;
};

function LoginForm() {
  const navigate = useNavigate();
  const showToast = useShowToast();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<LoginFormData> = async data => {
    try {
      await login({
        email: data.email,
        password: data.password,
      });
      navigate(ROUTE_PATH.COURSE_ENROLL);
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
    <>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <UncontrolledInput
          label="이메일"
          placeholder="abc@weolbu.com"
          type="email"
          error={!!errors.email}
          feedbackMessage={errors.email?.message}
          {...register('email', loginFormRules.email)}
        />
        <UncontrolledInput
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          type="password"
          error={!!errors.password}
          feedbackMessage={errors.password?.message}
          {...register('password', loginFormRules.password)}
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
    </>
  );
}

export default LoginForm;

const S = {
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
