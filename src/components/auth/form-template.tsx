import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z as u } from 'zod';
import FormInput from '../form/input';
import Link from 'next/link';
import { Button, buttonVariants } from '../ui/button';
import { Form } from '../ui/form';
import { cn } from '@/lib/utils';
import { Routes } from '@/enums/routes';

const FormSchema = u.object({
  email: u.string({
    required_error: "Поле обов'язкове",
  }),
  password: u.string({
    required_error: "Поле обов'язкове",
  }),
});

const AuthFormTemplate = ({
  loginWithCredentials,
  loginWithGoogle,
  variant,
}) => {
  const isSignUp = variant === 'sign-up';

  const form = useForm<u.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const title = isSignUp ? 'Створити акаунт' : 'Увійти';
  const ctaBottomButtonLabel = isSignUp ? 'Увійти' : 'Зареєструватись';
  const ctaBottomLink = isSignUp ? Routes.SignIn : Routes.SignUp;

  return (
    <>
      <div className='container relative hidden h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
        <Link
          href={ctaBottomLink}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'absolute right-4 top-4 md:right-8 md:top-8'
          )}
        >
          {ctaBottomButtonLabel}
        </Link>
        <div className='relative hidden h-full flex-col bg-muted  p-10 text-white dark:border-r lg:flex'>
          <div className='relative z-20 flex items-center text-lg font-medium'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='mr-2 h-6 w-6'
            >
              <path d='M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3' />
            </svg>
            Bookmark
          </div>
        </div>
        <div className='lg:p-8'>
          <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
            <div className='flex flex-col space-y-2 text-center'>
              <h1 className='text-2xl font-semibold tracking-tight'>{title}</h1>
              {isSignUp && (
                <p className='text-sm text-muted-foreground'>
                  Введіть вашу пошту нижче щоб створити акаунт
                </p>
              )}
            </div>
            <Form {...form}>
              <FormInput
                error={form.formState.errors['email']}
                required
                type='email'
                placeholder='hatake@gmail.com'
                control={form.control}
                name='email'
                label='Пошта'
              />
              {!isSignUp && (
                <FormInput
                  error={form.formState.errors['password']}
                  required
                  type='password'
                  placeholder='********'
                  control={form.control}
                  name='password'
                  label='Пароль'
                />
              )}
              <Button
                onClick={form.handleSubmit(loginWithCredentials)}
                type='submit'
              >
                {title}
              </Button>
            </Form>
            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-background px-2 text-muted-foreground'>
                  Або продовжити з
                </span>
              </div>
            </div>
            <Button onClick={loginWithGoogle} variant='outline' type='button'>
              Google
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthFormTemplate;
