'use client';

import React from 'react';

import Link from 'next/link';

import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';

import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [verifying, setVerifying] = React.useState(false);
  const [code, setCode] = React.useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    // Start the sign-up process using the email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // Send the user an email with the verification code
      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      });

      // Set 'verifying' true to display second form
      // and capture the OTP code
      setVerifying(true);
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push('/');
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error('Error:', JSON.stringify(err, null, 2));
    }
  };

  const signUpWith = (strategy: OAuthStrategy) => {
    if (!signUp) return null;

    return signUp.authenticateWithRedirect({
      strategy,
      redirectUrl: '/sign-up/sso-callback',
      redirectUrlComplete: '/',
    });
  };

  if (verifying) {
    return (
      <div className='flex h-screen w-full items-center justify-center lg:min-h-[600px]  xl:min-h-[800px]'>
        <Card className='w-full max-w-sm'>
          <CardHeader>
            <CardTitle className='text-2xl'>Верифікація</CardTitle>
          </CardHeader>
          <form onSubmit={handleVerify}>
            <CardContent className='grid gap-4'>
              <Label htmlFor='code'>Введіть верифікаційний код</Label>
              <Input
                id='code'
                name='code'
                onChange={(e) => setCode(e.target.value)}
              />
            </CardContent>
            <CardFooter className='flex gap-4'>
              <Button
                variant='outline'
                onClick={() => setVerifying(false)}
                className='w-full'
              >
                Назад
              </Button>
              <Button type='submit' className='w-full'>
                Далі
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className='h-screen w-full lg:flex lg:min-h-[600px] lg:items-center lg:justify-between xl:min-h-[800px]'>
      <div className='hidden lg:block lg:h-full lg:w-full'>
        <Image
          src='/auth.jpg'
          alt='Image'
          width='1920'
          height='1080'
          className='h-full w-full object-cover dark:brightness-[0.3] dark:grayscale'
        />
      </div>
      <div className='flex w-full items-center justify-center py-12'>
        <div className='mx-auto grid w-[350px] gap-6'>
          <div className='grid gap-2 text-center'>
            <h1 className='text-3xl font-bold'>Реєстрація</h1>
            <p className='text-balance text-muted-foreground'>
              Введіть свою електронну пошту та пароль для створення облікового
              запису
            </p>
          </div>
          <form onSubmit={(e) => handleSubmit(e)} className='grid gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='user'>Пошта</Label>
              <Input
                id='email'
                type='email'
                name='email'
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
              />
            </div>
            <div className='grid gap-2'>
              <div className='flex items-center'>
                <Label htmlFor='password'>Пароль</Label>
              </div>
              <Input
                id='password'
                type='password'
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type='submit' className='w-full'>
              Створити аккаунт
            </Button>
            <Button
              onClick={() => signUpWith('oauth_google')}
              variant='outline'
              className='w-full'
            >
              Реєстрація з Google
            </Button>
          </form>
          <div className='mt-4 text-center text-sm'>
            Уже є аккаунт?
            <Link href='/sign-in' className='ml-1 underline'>
              Вхід
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
