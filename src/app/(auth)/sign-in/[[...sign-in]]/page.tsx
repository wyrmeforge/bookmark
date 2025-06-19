import { SignInForm } from '@/features/auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Вхід | YOOKOSO',
  description: 'Форма авторизації - YOKOSO',
};

const SignIn = () => {
  return <SignInForm />;
};

export default SignIn;
