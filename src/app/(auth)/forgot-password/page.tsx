import type { Metadata } from "next";
import { ForgotPasswordForm } from "@/features/auth/ui/forgot-password-form";

export const metadata: Metadata = {
  title: "Відновлення паролю | YOOKOSO",
  description: "Форма відновлення паролю - YOKOSO",
};

const SignUp = () => {
  return <ForgotPasswordForm />;
};

export default SignUp;
