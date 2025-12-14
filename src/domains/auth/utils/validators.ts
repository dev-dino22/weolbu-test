import { VALIDATION_PATTERNS } from '@constants/validationPatterns';

export function validatePassword(value: string): true | string {
  if (value.length < 6 || value.length > 10) {
    return '비밀번호는 6자 이상 10자 이하여야 합니다';
  }

  const hasSpecialChar =
    VALIDATION_PATTERNS.signUpFormRules.passwordSpecialChar.test(value);
  if (hasSpecialChar) {
    return '비밀번호는 영문과 숫자만 사용할 수 있습니다';
  }

  const hasLowerCase =
    VALIDATION_PATTERNS.signUpFormRules.passwordLowercase.test(value);
  const hasUpperCase =
    VALIDATION_PATTERNS.signUpFormRules.passwordUppercase.test(value);
  const hasNumber =
    VALIDATION_PATTERNS.signUpFormRules.passwordNumber.test(value);

  const combinationCount = [hasLowerCase, hasUpperCase, hasNumber].filter(
    Boolean
  ).length;

  if (combinationCount < 2) {
    return '영문 소문자, 대문자, 숫자 중 최소 2가지 이상 조합이 필요합니다';
  }

  return true;
}
