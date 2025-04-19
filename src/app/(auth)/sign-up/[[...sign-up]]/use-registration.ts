import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Routes } from '@/enums/routes';
import { AuthCredentials } from '@/features/login-form/types';
import { toast } from '@/components/ui/use-toast';
import { AuthErrorCodes } from '@/enums/errorCodes';
import { isClerkAPIResponseError } from '@clerk/nextjs/errors';

const ERROR_MESSAGES: Record<string, string> = {
  [AuthErrorCodes.ACCOUNT_ALREADY_EXIST]:
    'Обліковий запис з такою поштою уже існує!',
};

const getErrorMessage = (code?: string) =>
  ERROR_MESSAGES[code ?? ''] ?? 'Сталася помилка. Спробуйте ще раз.';

export const useRegistration = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [verifying, setVerifying] = useState(false);

  const registerWithCredentials = async ({
    email,
    password,
    code,
  }: AuthCredentials) => {
    if (!isLoaded || !signUp) return;

    if (verifying) {
      await verifyAccount(code);

      return;
    }

    try {
      await signUp.create({
        emailAddress: email,
        password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      });

      setVerifying(true);
    } catch (err) {
      if (isClerkAPIResponseError(err)) {
        const errorCode = err.errors?.[0]?.code;
        toast({
          title: getErrorMessage(errorCode),
          variant: 'destructive',
        });
      }
      console.error('Register error:', JSON.stringify(err, null, 2));
    }
  };

  const registerWithGoogle = () => {
    if (!isLoaded || !signUp) return;

    return signUp.authenticateWithRedirect({
      strategy: 'oauth_google',
      redirectUrl: '/sign-up/sso-callback',
      redirectUrlComplete: Routes.Home,
    });
  };

  const verifyAccount = async (code: string) => {
    if (!isLoaded || !signUp) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push(Routes.Home);
        toast({
          title: 'Реєстрація пройшла успішно!',
          variant: 'success',
        });
      } else {
        console.error(
          'Unexpected sign-up verification result:',
          completeSignUp
        );
      }
    } catch (err) {
      toast({
        title: 'Помилка підтвердження акаунта',
        description: 'Код неправильний або недійсний. Спробуйте ще раз.',
        variant: 'destructive',
      });
      console.error('Verification error:', JSON.stringify(err, null, 2));
    }
  };

  return {
    registerWithCredentials,
    registerWithGoogle,
    verifyAccount,
    setVerifying,
    verifying,
  };
};
