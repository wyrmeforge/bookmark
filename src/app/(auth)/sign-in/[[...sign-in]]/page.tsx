'use client';

import React, { useState } from 'react';

import Link from 'next/link';

import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { useLogin } from './use-login';
import Loader from '@/components/loader';
import { useForm } from 'react-hook-form';
import { z as u } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '@/components/form/input';
import { Form } from '@/components/ui/form';

const FormSchema = u.object({
  user: u.string(),
  password: u.string(),
});

const SignIn = () => {
  const { loginWithCredentials, loginWithGoogle } = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    loginWithCredentials(email, password);
  };

  const handleGoogleLogin = () => {
    loginWithGoogle();
  };

  const form = useForm<u.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  return (
    <div className='mx-auto grid w-[450px] gap-6'>
      <div className='grid gap-2 text-center'>
        <h1 className='text-3xl font-bold'>Вхід</h1>
        <p className='text-md text-balance text-muted-foreground'>
          Введіть свої дані нижче, щоб увійти до облікового запису
        </p>
      </div>
      <Form {...form}>
        <FormInput
          error={form.formState.errors['user']}
          required
          placeholder='user@gmail.com'
          control={form.control}
          name='user'
          label='Пошта або нікнейм'
        />
        <FormInput
          required
          placeholder=''
          control={form.control}
          name='password'
          label='Пароль'
        />
        <Button type='submit'>Вхід</Button>
      </Form>
      <Button onClick={handleGoogleLogin} variant='outline' type='button'>
        Вхід через Google
      </Button>
      <div className='mt-4 text-center text-sm'>
        Немає аккаунту?
        <Link href='/sign-up' className='ml-1 underline'>
          Реєстрація
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
