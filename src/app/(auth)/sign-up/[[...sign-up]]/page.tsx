import type { Metadata } from "next";
import { SignUpForm } from "@/features/auth";

export const metadata: Metadata = {
  title: "Реєстрація | YOOKOSO",
  description: "Форма реєстрації - YOKOSO",
};

const SignUp = () => {
  return <SignUpForm />;
};

export default SignUp;
