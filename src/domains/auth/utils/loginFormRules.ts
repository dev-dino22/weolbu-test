import { type RegisterOptions } from 'react-hook-form';
import { VALIDATION_PATTERNS } from '@constants/validationPatterns';

type LoginFormData = {
  email: string;
  password: string;
};

export const loginFormRules: Record<
  keyof LoginFormData,
  RegisterOptions<LoginFormData>
> = {
  email: {
    required: '이메일을 입력해주세요',
    pattern: {
      value: VALIDATION_PATTERNS.signUpFormRules.email,
      message: '올바른 이메일 형식이 아닙니다',
    },
  },

  password: {
    required: '비밀번호를 입력해주세요',
  },
} as const;
