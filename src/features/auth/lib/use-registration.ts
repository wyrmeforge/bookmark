import { useSignUp } from '@clerk/nextjs';

import { isClerkAPIResponseError } from '@clerk/nextjs/errors';

import {
  ISignUpStepProps,
  SIGN_UP_ERROR_MESSAGES,
  SignUpFlowSteps,
  UseRegistrationReturn,
  SignUpFormValues,
} from '../model';
import { toast } from 'sonner';
import { Routes } from '@/shared/enums';

const getErrorMessage = (code?: string) =>
  SIGN_UP_ERROR_MESSAGES[code ?? ''] ?? 'Сталася помилка. Спробуйте ще раз.';

export const useRegistration = ({
  setFlowStep,
}: ISignUpStepProps): UseRegistrationReturn => {
  const { isLoaded, signUp } = useSignUp();

  const handleError = (err: unknown) => {
    const isClerkError = isClerkAPIResponseError(err);

    if (!isClerkError) {
      console.error('Register error:', JSON.stringify(err, null, 2));
      return;
    }

    const errorCode = err.errors?.[0]?.code;

    toast.error(getErrorMessage(errorCode));
  };

  const registerWithCredentials = async ({
    email,
    password,
    username,
  }: SignUpFormValues) => {
    if (!isLoaded || !signUp) return;

    try {
      await signUp.create({
        emailAddress: email,
        password,
        username,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      });

      setFlowStep(SignUpFlowSteps.Verification);
    } catch (err) {
      handleError(err);
    }
  };

  const registerWithGoogle = () => {
    if (!isLoaded || !signUp) return;

    return signUp.authenticateWithRedirect({
      strategy: 'oauth_google',
      redirectUrl: '/sign-up',
      redirectUrlComplete: Routes.Home,
    });
  };

  return {
    registerWithCredentials,
    registerWithGoogle,
  };
};
