'use client';

import { Button } from '@/shared/ui/button';
import { useFormContext } from 'react-hook-form';

import { CardHeader, CardTitle } from '@/shared/ui/card';
import { useVerify } from '../../lib/use-verify';
import { FormInputOTP } from '@/features/form/input-otp';

import {
  ISignUpStepProps,
  SignUpFlowSteps,
  SignUpFormFields,
  SignUpFormValues,
} from '../../model';

const VerificationStep = ({ setFlowStep }: ISignUpStepProps) => {
  const { handleSubmit } = useFormContext<SignUpFormValues>();
  const { verifyAccount } = useVerify({ setFlowStep });

  const onSubmit = handleSubmit(verifyAccount);

  const handleGoBack = () => {
    setFlowStep(SignUpFlowSteps.Registration);
  };

  return (
    <form onSubmit={onSubmit} className='w-full px-4 py-6 md:px-10'>
      <CardHeader className='px-0 text-center'>
        <CardTitle className='text-2xl'>Верифікація</CardTitle>
        <div className='text-grey flex flex-row items-center justify-center text-center text-sm'>
          Введіть верифікаційний код відправлений вам на пошту
        </div>
      </CardHeader>
      <div className='grid gap-6'>
        <div className='grid gap-6'>
          <FormInputOTP required name={SignUpFormFields.VerificationCode} />
          <div className='flex flex-row items-center justify-between gap-4'>
            <Button
              variant='outline'
              onClick={handleGoBack}
              className='w-full '
            >
              Назад
            </Button>
            <Button type='submit' className='w-full '>
              Зареєструватись
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export { VerificationStep };
