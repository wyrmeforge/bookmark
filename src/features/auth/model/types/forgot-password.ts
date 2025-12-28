import type { ForgotPasswordFormValues } from "../schema/forgot-password";

export const ForgotPasswordFormFields = {
  Email: "email",
  Password: "password",
  ConfirmPassword: "confirmPassword",
  VerificationCode: "verificationCode",
} as const;

export interface UseResetPassProps {
  setIsResetInitiated: (isResetInitiated: boolean) => void;
}

export interface UseResetPassReturn {
  createAndSendResetMail: ({
    email,
  }: ForgotPasswordFormValues) => Promise<void>;
  resetUserPassword: ({
    verificationCode,
    password,
  }: ForgotPasswordFormValues) => Promise<void>;
}

export const RESET_STRATEGY = "reset_password_email_code";
