import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

import { Routes } from '@/enums/routes';

import {
  ISignUpStepProps,
  SignUpFlowSteps,
  SignUpFormValues,
  UseVerifyReturn,
} from '../model';
import { toast } from 'sonner';

export const useVerify = ({
  setFlowStep,
}: ISignUpStepProps): UseVerifyReturn => {
  const { isLoaded, signUp, setActive } = useSignUp();

  const router = useRouter();

  const verifyAccount = async ({ verificationCode }: SignUpFormValues) => {
    if (!isLoaded || !signUp) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      });

      if (completeSignUp.status === 'complete') {
        setFlowStep(SignUpFlowSteps.Success);

        await setActive({ session: completeSignUp.createdSessionId });

        router.push(Routes.Home);

        toast.success('Реєстрація пройшла успішно!');
      } else {
        console.error(
          'Unexpected sign-up verification result:',
          completeSignUp
        );
      }
    } catch (err) {
      toast.error('Помилка підтвердження акаунта', {
        description: 'Код неправильний або недійсний. Спробуйте ще раз.',
      });
      console.error('Verification error:', JSON.stringify(err, null, 2));
    }
  };

  return {
    verifyAccount,
  };
};
