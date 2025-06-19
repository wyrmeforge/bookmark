import { Routes } from '@/shared/enums/routes';
import { useSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

import {
  ForgotPasswordFormValues,
  RESET_STRATEGY,
  UseResetPassProps,
  UseResetPassReturn,
} from '../model';
import { toast } from 'sonner';

export const useResetPass = ({
  setIsResetInitiated,
}: UseResetPassProps): UseResetPassReturn => {
  const router = useRouter();

  const { isLoaded, signIn, setActive } = useSignIn();

  const createAndSendResetMail = async ({
    email,
  }: ForgotPasswordFormValues) => {
    if (!isLoaded || !signIn) return;

    try {
      await signIn.create({
        strategy: RESET_STRATEGY,
        identifier: email,
      });

      toast.success('Відправлено успішно!', {
        description: `На пошту ${email} було відправлено код для скидання паролю`,
      });

      setIsResetInitiated(true);
    } catch (err: any) {
      const message =
        err?.errors?.[0]?.longMessage || 'Failed to send reset email.';
      console.error('Reset mail error:', message);
    }
  };

  const resetUserPassword = async ({
    verificationCode,
    password,
  }: ForgotPasswordFormValues) => {
    if (!isLoaded || !signIn) return;

    try {
      const result = await signIn.attemptFirstFactor({
        strategy: RESET_STRATEGY,
        code: verificationCode,
        password,
      });

      if (result.status === 'complete') {
        setActive({ session: result.createdSessionId });
        toast.success('Пароль змінено успішно!');
        router.push(Routes.SignIn);
      } else {
        console.log('Unexpected result:', result);
      }
    } catch (err: any) {
      const message = err?.errors?.[0]?.longMessage || 'Password reset failed.';
      console.error('Reset error:', message);
    }
  };

  return {
    createAndSendResetMail,
    resetUserPassword,
  };
};
