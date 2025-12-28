import type { Metadata } from "next";
import { SignInForm } from "@/features/auth/ui/sign-in-form";

export const metadata: Metadata = {
  title: "Вхід | YOOKOSO",
  description: "Форма авторизації - YOKOSO",
};

const SignIn = () => {
  return <SignInForm />;
};

export default SignIn;
