import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const useRegistration = () => {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [error, setError] = useState(null);
  const [verifying, setVerifying] = useState(false);
  const [code, setCode] = useState('');

  const router = useRouter();

  const registerWithCredentials = async ({ email, password }) => {
    if (!isLoaded) return null;

    try {
      await signUp.create({
        emailAddress: email,
        password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      });

      setVerifying(true);
    } catch (err: any) {
      setError(err.errors?.[0].message);
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const registerWithGoogle = () => {
    if (!isLoaded) return null;

    return signUp.authenticateWithRedirect({
      strategy: 'oauth_google',
      redirectUrl: '/sign-up/sso-callback',
      redirectUrlComplete: '/',
    });
  };

  const verifyAccount = async () => {
    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push('/home');
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      console.error('Error:', JSON.stringify(err, null, 2));
    }
  };

  return {
    registerWithCredentials,
    registerWithGoogle,
    verifyAccount,
    setVerifying,
    verifying,
    error,
    setCode,
  };
};
