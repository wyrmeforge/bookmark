'use client';

import { Button } from '@/shared/ui/button';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/shared/ui/form';
import { FormInput } from '@/features/form/input';
import { FormCheckbox } from '@/features/form/checkbox';
import { useLogin } from '../lib/use-login';
import { FormFooter, FormHeader, PasswordInput } from './components';

import { SignInFormFields, SignInFormSchema, SignInFormValues } from '../model';
import { Routes } from '@/shared/enums/routes';

const SignInForm = () => {
  const { loginWithCredentials, loginWithGoogle } = useLogin();

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      [SignInFormFields.Email]: '',
      [SignInFormFields.Password]: '',
      [SignInFormFields.Remember]: false,
    },
  });

  const onSubmit = form.handleSubmit(loginWithCredentials);

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className='w-full px-10 py-6'>
        <FormHeader
          title='З поверненням!'
          question='Не маєте акаунту?'
          ctaLabel='Зареєструватись'
          ctaHref={Routes.SignUp}
        />
        <div className='grid gap-6'>
          <div className='grid gap-6'>
            <FormInput
              required
              placeholder='Введіть вашу пошту або нікнейм'
              name={SignInFormFields.Email}
              label='Логін'
            />
            <PasswordInput label='Пароль' name={SignInFormFields.Password} />
            <div className='flex flex-row items-center justify-between'>
              <FormCheckbox
                className='w-auto flex-row-reverse justify-end gap-2 border-none p-0'
                name={SignInFormFields.Remember}
                label="Запам'ятати"
              />
              <Link
                href={Routes.ForgotPassword}
                className='ml-auto text-sm underline-offset-4 hover:underline'
              >
                Забули пароль?
              </Link>
            </div>
            <div className='flex items-center justify-between gap-4'>
              <Button type='submit' className='w-full '>
                Увійти
              </Button>
            </div>
            <FormFooter onGoogleBtnClick={loginWithGoogle} />
          </div>
        </div>
      </form>
    </Form>
  );
};

export { SignInForm };
