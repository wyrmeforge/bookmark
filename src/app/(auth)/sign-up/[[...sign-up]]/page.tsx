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
    setCode,
  } = useRegistration();

  // if (verifying) {
  //   return (
  //     <div className='flex w-full items-center justify-center'>
  //       <Card className='border-none'>
  //         <CardHeader className='px-0 text-center'>
  //           <CardTitle className='text-xl'>Верифікація</CardTitle>
  //         </CardHeader>
  //         <form onSubmit={handleVerify}>
  //           <CardContent className='grid gap-4'>
  //             <Label htmlFor='code'>Введіть верифікаційний код</Label>
  //             <Input
  //               id='code'
  //               name='code'
  //               onChange={(e) => setCode(e.target.value)}
  //             />
  //           </CardContent>
  //           <CardFooter className='flex gap-4'>
  //             <Button
  //               variant='outline'
  //               onClick={() => setVerifying(false)}
  //               className='w-full'
  //             >
  //               Назад
  //             </Button>
  //             <Button type='submit' className='w-full'>
  //               Далі
  //             </Button>
  //           </CardFooter>
  //         </form>
  //       </Card>
  //     </div>
  //   );
  // }

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
