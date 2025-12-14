/**
 * 애플리케이션 전역에서 사용하는 정규식 패턴 상수
 */
export const VALIDATION_PATTERNS = {
  /** 이메일 형식: example@domain.com */
  EMAIL: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,

  /** 휴대폰 번호 형식: 010-1234-5678 */
  PHONE: /^01[0-9]-[0-9]{3,4}-[0-9]{4}$/,

  /** 비밀번호 - 영문 소문자 포함 여부 */
  PASSWORD_LOWERCASE: /[a-z]/,

  /** 비밀번호 - 영문 대문자 포함 여부 */
  PASSWORD_UPPERCASE: /[A-Z]/,

  /** 비밀번호 - 숫자 포함 여부 */
  PASSWORD_NUMBER: /[0-9]/,

  /** 비밀번호 - 특수문자 포함 여부 (영문, 숫자를 제외한 모든 문자) */
  PASSWORD_SPECIAL_CHAR: /[^a-zA-Z0-9]/,
} as const;
