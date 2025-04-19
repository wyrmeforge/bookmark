import { useRouter } from 'next/navigation';
import { useSignIn } from '@clerk/nextjs';
import { isClerkAPIResponseError } from '@clerk/nextjs/errors';

import { toast } from '@/components/ui/use-toast';
import { Routes } from '@/enums/routes';
import { AuthErrorCodes } from '@/enums/errorCodes';

type AuthCredentials = {
  email: string;
  password: string;
};

const ERROR_MESSAGES: Record<string, string> = {
  [AuthErrorCodes.ACCOUNT_NOT_FOUND]: 'Неправильний логін або пароль!',
  [AuthErrorCodes.CREDENTIALS_INCORRECT]: 'Неправильний логін або пароль!',
};

const getErrorMessage = (code?: string) =>
  ERROR_MESSAGES[code ?? ''] ?? 'Сталася помилка. Спробуйте ще раз.';

export const useLogin = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();

  const loginWithCredentials = async ({ email, password }: AuthCredentials) => {
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
        toast({
          title: getErrorMessage(errorCode),
          variant: 'destructive',
        });
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
