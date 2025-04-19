import { SubmitHandler } from 'react-hook-form';

export type AuthCredentials = {
  readonly email: string;
  readonly password: string;
  readonly code: string;
};

export interface ILoginFormProps {
  isSignUp?: boolean;
  handleCredentials: SubmitHandler<AuthCredentials>;
  handleOAuth: () => void;
}
