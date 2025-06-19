'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useResetPass } from '../lib/use-reset-pass';
import { Form } from '@/shared/ui/form';
import { useForm } from 'react-hook-form';
import { CardHeader, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { Routes } from '@/shared/enums/routes';
import { FormInput } from '@/features/form/input';
import { PasswordInput } from './components';

import { zodResolver } from '@hookform/resolvers/zod';

import {
  ForgotPasswordFormFields,
  ForgotPasswordFormValues,
  ForgotPasswordStep1Schema,
  ForgotPasswordStep2Schema,
} from '../model';

const ForgotPasswordForm = () => {
  const router = useRouter();
  const [isResetInitiated, setIsResetInitiated] = useState(false);

  const { createAndSendResetMail, resetUserPassword } = useResetPass({
    setIsResetInitiated,
  });

  const schema = isResetInitiated
    ? ForgotPasswordStep2Schema
    : ForgotPasswordStep1Schema;

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      [ForgotPasswordFormFields.Email]: '',
      [ForgotPasswordFormFields.Password]: '',
      [ForgotPasswordFormFields.ConfirmPassword]: '',
      [ForgotPasswordFormFields.VerificationCode]: '',
    },
    mode: 'onChange',
  });

  const submitFn = isResetInitiated
    ? resetUserPassword
    : createAndSendResetMail;

  const onSubmit = form.handleSubmit(submitFn);

  const handleGoBack = () => {
    if (isResetInitiated) {
      setIsResetInitiated(false);
    } else {
      router.push(Routes.SignIn);
    }
  };

  const description = isResetInitiated
    ? 'Введіть новий пароль'
    : ' Введіть пошту на яку буде надіслано код для скидання паролю';
  const ctaButton = isResetInitiated ? 'Змінити' : 'Далі';

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className='w-full px-10 py-6'>
        <CardHeader className='px-0 text-center'>
          <CardTitle className='text-2xl'>Відновлення паролю</CardTitle>
          <div className='flex flex-row items-center justify-center gap-2'>
            <div className='text-grey text-center text-sm'>{description}</div>
          </div>
        </CardHeader>
        <div className='mb-6 flex flex-col gap-6'>
          {isResetInitiated ? (
            <>
              <FormInput
                key={ForgotPasswordFormFields.VerificationCode}
                label='Верифікаційний код'
                type='code'
                required
                placeholder={`Введіть код надісланий Вам на пошту`}
                name={ForgotPasswordFormFields.VerificationCode}
              />
              <PasswordInput
                name={ForgotPasswordFormFields.Password}
                label='Новий пароль'
              />
              <PasswordInput
                name={ForgotPasswordFormFields.ConfirmPassword}
                label='Підтвердіть пароль'
              />
            </>
          ) : (
            <FormInput
              key={ForgotPasswordFormFields.Email}
              required
              type='email'
              placeholder='Введіть вашу пошту'
              name={ForgotPasswordFormFields.Email}
              label='Пошта'
            />
          )}
        </div>
        <div className='flex items-center justify-between gap-4'>
          <Button
            type='button'
            variant='outline'
            onClick={handleGoBack}
            className='w-full'
          >
            Назад
          </Button>
          <Button type='submit' className='w-full '>
            {ctaButton}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export { ForgotPasswordForm };
