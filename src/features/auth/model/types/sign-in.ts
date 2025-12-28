import type { SignInFormValues } from "../schema/sign-in";

export const SignInFormFields = {
  Email: "email",
  Password: "password",
  Remember: "remember",
} as const;

export interface UseLoginReturn {
  loginWithCredentials: ({
    email,
    password,
  }: SignInFormValues) => Promise<void>;
  loginWithGoogle: () => Promise<void> | undefined;
}
