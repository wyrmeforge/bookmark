import { useSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export const useLogin = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();

  const loginWithCredentials = async (email: string, password: string) => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });

        router.push('/home');
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const loginWithGoogle = () => {
    if (!signIn) return null;

    return signIn.authenticateWithRedirect({
      strategy: 'oauth_google',
      redirectUrl: '/sign-up/sso-callback',
      redirectUrlComplete: '/home',
    });
  };

  return { loginWithCredentials, loginWithGoogle };
};
