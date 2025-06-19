import { SignInFormValues } from '../schema';

export enum SignInFormFields {
  Email = 'email',
  Password = 'password',
  Remember = 'remember',
}

export type UseLoginReturn = {
  loginWithCredentials: ({
    email,
    password,
  }: SignInFormValues) => Promise<void>;
  loginWithGoogle: () => Promise<void> | undefined;
};
