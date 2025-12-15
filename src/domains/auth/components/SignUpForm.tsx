import Button from '@components/actions/Button';
import UncontrolledInput from '@components/actions/Input/UncontrolledInput';
import {
  RadioButton,
  RadioGroup,
} from '@components/actions/Input/UncontrolledRadio';
import styled from '@emotion/styled';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { ROUTE_PATH } from '@routes/routePath';
import { useShowToast } from '@components/toast/ToastProvider';
import { users } from '@apis/users';
import { ApiError } from '@apis/apiClient';
import { useAuth } from '@domains/auth/context/AuthProvider';
import { signUpFormRules } from '@domains/auth/validation/index';

type SignUpFormData = {
  name: string;
  email: string;
  phone: string;
  password: string;
  userType: 'STUDENT' | 'INSTRUCTOR';
};

function SignUpForm() {
  const navigate = useNavigate();
  const showToast = useShowToast();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<SignUpFormData> = async data => {
    try {
      await users.postSignUp({
        email: data.email,
        password: data.password,
        name: data.name,
        phone: data.phone,
        role: data.userType,
      });

      await login({
        email: data.email,
        password: data.password,
      });

      showToast({
        mode: 'SUCCESS',
        message: '회원가입이 완료되었습니다!',
      });

      navigate(ROUTE_PATH.COURSE_ENROLL);
    } catch (error) {
      if (error instanceof ApiError && error.body) {
        const errorMessage =
          typeof error.body.message === 'string' ? error.body.message : null;

        showToast({
          mode: 'ERROR',
          message: errorMessage || '회원가입에 실패했습니다.',
        });
      } else {
        showToast({
          mode: 'ERROR',
          message: '회원가입에 실패했습니다. 다시 시도해주세요.',
        });
      }
    }
  };

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <UncontrolledInput
        label="이름"
        placeholder="김월부"
        required
        error={!!errors.name}
        feedbackMessage={errors.name?.message}
        {...register('name', signUpFormRules.name)}
      />
      <UncontrolledInput
        label="이메일"
        placeholder="abc@weolbu.com"
        type="email"
        required
        error={!!errors.email}
        feedbackMessage={errors.email?.message}
        {...register('email', signUpFormRules.email)}
      />
      <UncontrolledInput
        label="휴대폰 번호"
        placeholder="010-1234-5678"
        type="tel"
        required
        error={!!errors.phone}
        feedbackMessage={errors.phone?.message}
        {...register('phone', signUpFormRules.phone)}
      />
      <UncontrolledInput
        label="비밀번호"
        placeholder="6~10자, 영문/숫자 조합"
        maxLength={10}
        type="password"
        required
        error={!!errors.password}
        feedbackMessage={errors.password?.message}
        {...register('password', signUpFormRules.password)}
      />
      <RadioGroup legend="수강 신청 유형">
        <RadioButton
          value="STUDENT"
          {...register('userType', {
            required: '회원 유형을 선택해주세요',
          })}
        >
          수강생
        </RadioButton>
        <RadioButton
          value="INSTRUCTOR"
          {...register('userType', {
            required: '회원 유형을 선택해주세요',
          })}
        >
          강사
        </RadioButton>
      </RadioGroup>
      <Button type="submit" size="lg">
        회원 가입
      </Button>
    </S.Form>
  );
}

export default SignUpForm;

const S = {
  Form: styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level2};
  `,
};
