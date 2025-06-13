'use client';

import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useRegistration } from './use-registration';
import { LoginForm } from '@/features/login-form';

const SignUp = () => {
  const {
    registerWithCredentials,
    registerWithGoogle,
    verifyAccount,
    setVerifying,
    verifying,
    handleVerify,
    setCode,
  } = useRegistration();

  if (verifying) {
    return (
      <div className='min-h-[450px] w-full max-w-sm md:max-w-4xl'>
        <Card>
          <form onSubmit={handleVerify}>
            <CardContent className='flex w-full gap-4 p-0'>
              <CardHeader className='px-0 text-center'>
                <CardTitle className='text-xl'>Верифікація</CardTitle>
              </CardHeader>
              <Label htmlFor='code'>Введіть верифікаційний код</Label>
              <Input
                id='code'
                name='code'
                onChange={(e) => setCode(e.target.value)}
              />
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
            </CardContent>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <LoginForm
      handleCredentials={registerWithCredentials}
      handleOAuth={registerWithGoogle}
      isSignUp
      isVerifying={verifying}
      verifyAccount={verifyAccount}
      setVerifying={setVerifying}
    />
  );
};

export default SignUp;
