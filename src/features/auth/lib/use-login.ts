import { useRouter } from 'next/navigation';
import { useSignIn } from '@clerk/nextjs';
import { isClerkAPIResponseError } from '@clerk/nextjs/errors';

import { Routes } from '@/enums/routes';
import {
  SIGN_IN_ERROR_MESSAGES,
  SignInFormValues,
  UseLoginReturn,
} from '../model';
import { toast } from 'sonner';

const getErrorMessage = (code?: string) =>
  SIGN_IN_ERROR_MESSAGES[code ?? ''] ?? 'Сталася помилка. Спробуйте ще раз.';

export const useLogin = (): UseLoginReturn => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();

  const loginWithCredentials = async ({
    email,
    password,
  }: SignInFormValues) => {
    if (!isLoaded || !signIn) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.push(Routes.Home);
      } else {
        console.error('Unexpected sign-in response:', signInAttempt);
      }
    } catch (err) {
      if (isClerkAPIResponseError(err)) {
        const errorCode = err.errors?.[0]?.code;
        toast.error(getErrorMessage(errorCode));
      }

      console.error('Sign-in error:', JSON.stringify(err, null, 2));
    }
  };

  const loginWithGoogle = () => {
    if (!signIn) return;

    return signIn.authenticateWithRedirect({
      strategy: 'oauth_google',
      redirectUrl: '/sign-in/sso-callback',
      redirectUrlComplete: Routes.Home,
    });
  };

  return { loginWithCredentials, loginWithGoogle };
};
