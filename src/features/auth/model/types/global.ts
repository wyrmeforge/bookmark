export const AuthErrorCodes = {
  CREDENTIALS_INCORRECT: "form_password_incorrect",
  ACCOUNT_NOT_FOUND: "form_identifier_not_found",
  ACCOUNT_ALREADY_EXIST: "form_identifier_exists",
} as const;

export type AuthErrorCodes =
  (typeof AuthErrorCodes)[keyof typeof AuthErrorCodes];
