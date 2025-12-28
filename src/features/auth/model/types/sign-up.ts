import type { SignUpFormValues } from "../schema/sign-up";

export const SignUpFormFields = {
  Email: "email",
  Password: "password",
  Username: "username",
  ConfirmPassword: "confirmPassword",
  VerificationCode: "verificationCode",
} as const;

export const SignUpFlowSteps = {
  Registration: "registration",
  Verification: "verification",
  Success: "success",
} as const;

export type SignUpFlowStepsType =
  (typeof SignUpFlowSteps)[keyof typeof SignUpFlowSteps];

export interface ISignUpStepProps {
  setFlowStep: (flowStep: SignUpFlowStepsType) => void;
}

export interface UseRegistrationReturn {
  registerWithCredentials: ({
    email,
    password,
    username,
  }: SignUpFormValues) => Promise<void>;
  registerWithGoogle: () => Promise<void> | undefined;
}

export interface UseVerifyReturn {
  verifyAccount: ({ verificationCode }: SignUpFormValues) => Promise<void>;
}
