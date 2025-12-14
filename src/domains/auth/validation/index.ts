import { type RegisterOptions } from 'react-hook-form';
import { VALIDATION_PATTERNS, formatPhoneNumber } from '@shared/validation';

/**
 * 비밀번호 유효성 검증
 * - 6자 이상 10자 이하
 * - 영문과 숫자만 사용 가능 (특수문자 불가)
 * - 영문 소문자, 대문자, 숫자 중 최소 2가지 이상 조합
 */
export function validatePassword(value: string): true | string {
  if (value.length < 6 || value.length > 10) {
    return '비밀번호는 6자 이상 10자 이하여야 합니다';
  }

  const hasSpecialChar = VALIDATION_PATTERNS.PASSWORD_SPECIAL_CHAR.test(value);
  if (hasSpecialChar) {
    return '비밀번호는 영문과 숫자만 사용할 수 있습니다';
  }

  const hasLowerCase = VALIDATION_PATTERNS.PASSWORD_LOWERCASE.test(value);
  const hasUpperCase = VALIDATION_PATTERNS.PASSWORD_UPPERCASE.test(value);
  const hasNumber = VALIDATION_PATTERNS.PASSWORD_NUMBER.test(value);

  const combinationCount = [hasLowerCase, hasUpperCase, hasNumber].filter(
    Boolean
  ).length;

  if (combinationCount < 2) {
    return '영문 소문자, 대문자, 숫자 중 최소 2가지 이상 조합이 필요합니다';
  }

  return true;
}

// ============================================================================
// Form Validation Rules
// ============================================================================

type LoginFormData = {
  email: string;
  password: string;
};

type SignUpFormData = {
  name: string;
  email: string;
  phone: string;
  password: string;
  userType: 'STUDENT' | 'INSTRUCTOR';
};

/**
 * 로그인 폼의 react-hook-form validation rules
 */
export const loginFormRules: Record<
  keyof LoginFormData,
  RegisterOptions<LoginFormData>
> = {
  email: {
    required: '이메일을 입력해주세요',
    pattern: {
      value: VALIDATION_PATTERNS.EMAIL,
      message: '올바른 이메일 형식이 아닙니다',
    },
  },

  password: {
    required: '비밀번호를 입력해주세요',
  },
} as const;

/**
 * 회원가입 폼의 react-hook-form validation rules
 */
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
      value: VALIDATION_PATTERNS.EMAIL,
      message: '올바른 이메일 형식이 아닙니다',
    },
  },

  phone: {
    required: '휴대폰 번호를 입력해주세요',
    pattern: {
      value: VALIDATION_PATTERNS.PHONE,
      message: '올바른 휴대폰 번호 형식이 아닙니다 (예: 010-1234-5678)',
    },
    onChange: e => {
      e.target.value = formatPhoneNumber(e.target.value);
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
