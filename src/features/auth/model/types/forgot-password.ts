import { ForgotPasswordFormValues } from '../schema';

export enum ForgotPasswordFormFields {
  Email = 'email',
  Password = 'password',
  ConfirmPassword = 'confirmPassword',
  VerificationCode = 'verificationCode',
}

export type UseResetPassProps = {
  setIsResetInitiated: (isResetInitiated: boolean) => void;
};

export type UseResetPassReturn = {
  createAndSendResetMail: ({
    email,
  }: ForgotPasswordFormValues) => Promise<void>;
  resetUserPassword: ({
    verificationCode,
    password,
  }: ForgotPasswordFormValues) => Promise<void>;
};

export const RESET_STRATEGY = 'reset_password_email_code';
