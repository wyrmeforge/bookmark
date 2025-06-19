import { ForgotPasswordForm } from '@/features/auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Відновлення паролю | YOOKOSO',
  description: 'Форма відновлення паролю - YOKOSO',
};

const SignUp = () => {
  return <ForgotPasswordForm />;
};

export default SignUp;
