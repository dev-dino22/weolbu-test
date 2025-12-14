export const VALIDATION_PATTERNS = {
  signUpFormRules: {
    email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    phone: /^01[0-9]-[0-9]{3,4}-[0-9]{4}$/,
    passwordLowercase: /[a-z]/,
    passwordUppercase: /[A-Z]/,
    passwordNumber: /[0-9]/,
    passwordSpecialChar: /[^a-zA-Z0-9]/,
  },
} as const;
