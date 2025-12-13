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

type SignUpFormData = {
  name: string;
  email: string;
  phone: string;
  password: string;
  userType: 'STUDENT' | 'INSTRUCTOR';
};

function SignUpPage() {
  const navigate = useNavigate();
  const showToast = useShowToast();
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

      await users.postLogin({
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
        const errorMessage = (error.body as { message?: string }).message;
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

  // TODO: 리팩토링 함수분리

  const validatePassword = (value: string) => {
    if (value.length < 6 || value.length > 10) {
      return '비밀번호는 6자 이상 10자 이하여야 합니다';
    }

    const hasSpecialChar = /[^a-zA-Z0-9]/.test(value);
    if (hasSpecialChar) {
      return '비밀번호는 영문과 숫자만 사용할 수 있습니다';
    }

    const hasLowerCase = /[a-z]/.test(value);
    const hasUpperCase = /[A-Z]/.test(value);
    const hasNumber = /[0-9]/.test(value);

    const combinationCount = [hasLowerCase, hasUpperCase, hasNumber].filter(
      Boolean
    ).length;

    if (combinationCount < 2) {
      return '영문 소문자, 대문자, 숫자 중 최소 2가지 이상 조합이 필요합니다';
    }

    return true;
  };

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/[^\d]/g, '');

    const limitedNumbers = numbers.slice(0, 11);

    if (limitedNumbers.length <= 3) {
      return limitedNumbers;
    } else if (limitedNumbers.length <= 7) {
      return `${limitedNumbers.slice(0, 3)}-${limitedNumbers.slice(3)}`;
    } else {
      return `${limitedNumbers.slice(0, 3)}-${limitedNumbers.slice(
        3,
        7
      )}-${limitedNumbers.slice(7)}`;
    }
  };

  return (
    <S.Container>
      <S.Title>회원 가입</S.Title>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <UncontrolledInput
          label="이름"
          placeholder="김월부"
          required
          error={!!errors.name}
          feedbackMessage={errors.name?.message}
          {...register('name', {
            required: '이름을 입력해주세요',
            minLength: {
              value: 2,
              message: '이름은 최소 2자 이상이어야 합니다',
            },
          })}
        />
        <UncontrolledInput
          label="이메일"
          placeholder="abc@weolbu.com"
          type="email"
          required
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
          label="휴대폰 번호"
          placeholder="010-1234-5678"
          type="tel"
          required
          error={!!errors.phone}
          feedbackMessage={errors.phone?.message}
          {...register('phone', {
            required: '휴대폰 번호를 입력해주세요',
            pattern: {
              value: /^01[0-9]-[0-9]{3,4}-[0-9]{4}$/,
              message: '올바른 휴대폰 번호 형식이 아닙니다 (예: 010-1234-5678)',
            },
            onChange: e => {
              e.target.value = formatPhoneNumber(e.target.value);
            },
          })}
        />
        <UncontrolledInput
          label="비밀번호"
          placeholder="6~10자, 영문/숫자 조합"
          maxLength={10}
          type="password"
          required
          error={!!errors.password}
          feedbackMessage={errors.password?.message}
          {...register('password', {
            required: '비밀번호를 입력해주세요',
            validate: validatePassword,
          })}
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
    gap: ${({ theme }) => theme.GAP.level2};
  `,
};
