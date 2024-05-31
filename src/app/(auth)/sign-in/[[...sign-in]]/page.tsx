'use client';

import { useSignIn } from '@clerk/nextjs';
import React from 'react';

import Link from 'next/link';

import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const SignIn = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });

        router.push('/');
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const signInWith = (strategy) => {
    if (!signIn) return null;

    return signIn.authenticateWithRedirect({
      strategy,
      redirectUrl: '/sign-up/sso-callback',
      redirectUrlComplete: '/',
    });
  };

  return (
    <>
      <div className='h-screen w-full lg:flex lg:min-h-[600px] lg:items-center lg:justify-between xl:min-h-[800px]'>
        <div className='flex w-full items-center justify-center py-12'>
          <div className='mx-auto grid w-[450px] gap-6'>
            <div className='grid gap-2 text-center'>
              <h1 className='text-3xl font-bold'>Вхід</h1>
              <p className='text-md text-balance text-muted-foreground'>
                Введіть свої дані нижче, щоб увійти до облікового запису
              </p>
            </div>
            <form onSubmit={(e) => handleSubmit(e)} className='grid gap-4'>
              <div className='grid gap-2'>
                <Label htmlFor='user'>Пошта або нікнейм</Label>
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  id='user'
                  name='user'
                  value={email}
                  required
                />
              </div>
              <div className='grid gap-2'>
                <div className='flex items-center'>
                  <Label htmlFor='password'>Пароль</Label>
                  <Link
                    href='/forgot-password'
                    className='ml-auto inline-block text-sm underline'
                  >
                    Забули пароль?
                  </Link>
                </div>
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  id='password'
                  name='password'
                  type='password'
                  required
                />
              </div>
              <Button type='submit' className='w-full'>
                Вхід
              </Button>
              <Button
                onClick={() => signInWith('oauth_google')}
                variant='outline'
                className='w-full'
              >
                Вхід з Google
              </Button>
            </form>
            <div className='mt-4 text-center text-sm'>
              Немає аккаунту?
              <Link href='/sign-up' className='ml-1 underline'>
                Реєстрація
              </Link>
            </div>
          </div>
        </div>
        <div className='hidden lg:block lg:h-full lg:w-auto lg:w-full'>
          <Image
            src='/auth.jpg'
            alt='Image'
            width='1920'
            height='1080'
            className='h-full w-full object-cover [transform:rotateY(180deg)] dark:brightness-[0.3] dark:grayscale'
          />
        </div>
      </div>
    </>
  );
};

export default SignIn;
