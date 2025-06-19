import { SignUpForm } from '@/features/auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Реєстрація | YOOKOSO',
  description: 'Форма реєстрації - YOKOSO',
};

const SignUp = () => {
  return <SignUpForm />;
};

export default SignUp;
