import { Button } from '@/components/ui/button';
import {
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { z as u } from 'zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import FormInput from '@/components/form/input';
import { ILoginFormProps } from './types';
import { createFormSchema } from './utils';
import PasswordInput from './components/password-input';
import { Routes } from '@/enums/routes';
import { useCallback } from 'react';

export function LoginForm({
  isSignUp,
  isVerifying,
  setVerifying,
  handleCredentials,
  handleOAuth,
}: ILoginFormProps) {
  const FormSchema = createFormSchema(isSignUp);

  const form = useForm<u.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
      code: '',
    },
  });

  const ctaLink = isSignUp ? Routes.SignIn : Routes.SignUp;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleCredentials)}
        className='w-full max-w-md px-10 py-6'
      >
        <CardHeader className='px-0 text-center'>
          <CardTitle className='text-xl'>
            {isSignUp ? 'Ласкаво просимо' : 'З поверненням'}
          </CardTitle>
          <CardDescription>
            {isSignUp
              ? 'Зареєструйтесь за допомогою свого облікового запису Google'
              : 'Увійдіть за допомогою свого облікового запису Google'}
          </CardDescription>
        </CardHeader>
        <div className='grid gap-6'>
          <Button
            onClick={handleOAuth}
            variant='outline'
            type='button'
            className='w-full'
          >
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
              <path
                d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z'
                fill='currentColor'
              />
            </svg>
            Google
          </Button>
          <div className='relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border'>
            <span className='relative z-10 bg-background px-2 text-muted-foreground'>
              Або
            </span>
          </div>
          <div className='grid gap-6'>
            {!isVerifying ? (
              <>
                <FormInput
                  required
                  type='email'
                  placeholder='hatake@gmail.com'
                  control={form.control}
                  name='email'
                  label={isSignUp ? 'Введіть вашу пошту' : 'Логін'}
                />
                <PasswordInput isSignUp={isSignUp} control={form.control} />
              </>
            ) : (
              <FormInput
                required
                type='text'
                control={form.control}
                name='code'
                label={'Введіть верифікаційний код'}
              />
            )}
            <div className='flex items-center justify-between gap-4'>
              {isVerifying && (
                <Button
                  onClick={() => setVerifying(false)}
                  variant='outline'
                  type='button'
                  className='w-full'
                >
                  Назад
                </Button>
              )}
              <Button type='submit' className='w-full'>
                {isSignUp ? 'Далі' : 'Увійти'}
              </Button>
            </div>
          </div>
          <CardFooter className='justify-center px-0'>
            <div className='text-center text-sm'>
              {isSignUp
                ? 'Уже маєте обліковий запис? '
                : 'Не маєте облікового запису? '}
              <Link className='underline underline-offset-4' href={ctaLink}>
                {isSignUp ? 'Увійти' : 'Зареєструватись'}
              </Link>
            </div>
          </CardFooter>
        </div>
      </form>
    </Form>
  );
}
