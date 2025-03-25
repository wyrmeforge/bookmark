'use client';

import { useLogin } from './use-login';

import AuthFormTemplate from '@/components/auth/form-template';

const SignIn = () => {
  const { loginWithCredentials, loginWithGoogle } = useLogin();

  return (
    <AuthFormTemplate
      loginWithCredentials={loginWithCredentials}
      loginWithGoogle={loginWithGoogle}
    />
  );
};

export default SignIn;
