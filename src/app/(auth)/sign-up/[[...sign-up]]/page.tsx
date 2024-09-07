'use client';

import React, { useState } from 'react';

import Link from 'next/link';

import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useRegistration } from './use-registration';

const SignUp = () => {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const {
    registerWithCredentials,
    registerWithGoogle,
    verifyAccount,
    setVerifying,
    verifying,
    setCode,
  } = useRegistration();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    registerWithCredentials(emailAddress, password);
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    verifyAccount();
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
              onClick={registerWithGoogle}
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
