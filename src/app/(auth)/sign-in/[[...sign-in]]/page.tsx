'use client';

import { LoginForm } from '@/features/login-form';
import { useLogin } from './use-login';

const SignIn = () => {
  const { loginWithCredentials, loginWithGoogle } = useLogin();

  return (
    <LoginForm
      handleCredentials={loginWithCredentials}
      handleOAuth={loginWithGoogle}
    />
  );
};

export default SignIn;
