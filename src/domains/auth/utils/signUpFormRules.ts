import { VALIDATION_PATTERNS } from '@constants/validationPatterns';
import { formatters } from '@utils/formatters';
import { type RegisterOptions } from 'react-hook-form';
import { validatePassword } from './validators';

type SignUpFormData = {
  name: string;
  email: string;
  phone: string;
  password: string;
  userType: 'STUDENT' | 'INSTRUCTOR';
};

export const signUpFormRules: Record<
  keyof SignUpFormData,
  RegisterOptions<SignUpFormData>
> = {
  name: {
    required: '이름을 입력해주세요',
    minLength: {
      value: 2,
      message: '이름은 최소 2자 이상이어야 합니다',
    },
  },

  email: {
    required: '이메일을 입력해주세요',
    pattern: {
      value: VALIDATION_PATTERNS.signUpFormRules.email,
      message: '올바른 이메일 형식이 아닙니다',
    },
  },

  phone: {
    required: '휴대폰 번호를 입력해주세요',
    pattern: {
      value: VALIDATION_PATTERNS.signUpFormRules.phone,
      message: '올바른 휴대폰 번호 형식이 아닙니다 (예: 010-1234-5678)',
    },
    onChange: e => {
      e.target.value = formatters.phoneNumber(e.target.value);
    },
  },

  password: {
    required: '비밀번호를 입력해주세요',
    validate: validatePassword,
  },

  userType: {
    required: '회원 유형을 선택해주세요',
  },
} as const;
