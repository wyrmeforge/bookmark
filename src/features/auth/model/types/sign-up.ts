import type { SignUpFormValues } from "../schema";

export enum SignUpFormFields {
  Email = "email",
  Password = "password",
  Username = "username",
  ConfirmPassword = "confirmPassword",
  VerificationCode = "verificationCode",
}

export enum SignUpFlowSteps {
  Registration = "registration",
  Verification = "verification",
  Success = "success",
}

export type ISignUpStepProps = {
  setFlowStep: (flowStep: SignUpFlowSteps) => void;
};

export type UseRegistrationReturn = {
  registerWithCredentials: ({
    email,
    password,
    username,
  }: SignUpFormValues) => Promise<void>;
  registerWithGoogle: () => Promise<void> | undefined;
};

export type UseVerifyReturn = {
  verifyAccount: ({ verificationCode }: SignUpFormValues) => Promise<void>;
};
