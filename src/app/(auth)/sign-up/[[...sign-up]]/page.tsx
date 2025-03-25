'use client';

import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useRegistration } from './use-registration';
import AuthFormTemplate from '@/components/auth/form-template';

const SignUp = () => {
  const {
    registerWithCredentials,
    registerWithGoogle,
    verifyAccount,
    setVerifying,
    verifying,
    setCode,
  } = useRegistration();

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
    <AuthFormTemplate
      variant='sign-up'
      loginWithCredentials={registerWithCredentials}
      loginWithGoogle={registerWithGoogle}
    />
  );
};

export default SignUp;
