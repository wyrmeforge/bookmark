"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Routes } from "@/shared/enums";
import { Button } from "@/shared/ui/button";
import { Form } from "@/shared/ui/form";
import { FormCheckbox } from "@/shared/ui/form-checkbox";
import { FormInput } from "@/shared/ui/form-input";
import { useLogin } from "../lib/use-login";
import {
  SignInFormFields,
  SignInFormSchema,
  type SignInFormValues,
} from "../model";
import { FormFooter, FormHeader, PasswordInput } from "./components";

const SignInForm = () => {
  const { loginWithCredentials, loginWithGoogle } = useLogin();

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      [SignInFormFields.Email]: "",
      [SignInFormFields.Password]: "",
      [SignInFormFields.Remember]: false,
    },
  });

  const onSubmit = form.handleSubmit(loginWithCredentials);

  return (
    <Form {...form}>
      <form className="w-full px-4 md:px-10 md:py-6" onSubmit={onSubmit}>
        <FormHeader
          ctaHref={Routes.SignUp}
          ctaLabel="Зареєструватись"
          question="Не маєте акаунту?"
          title="З поверненням!"
        />
        <div className="grid gap-6">
          <div className="grid gap-6">
            <FormInput
              label="Логін"
              name={SignInFormFields.Email}
              placeholder="Введіть вашу пошту або нікнейм"
              required
            />
            <PasswordInput label="Пароль" name={SignInFormFields.Password} />
            <div className="flex flex-row items-center justify-between">
              <FormCheckbox
                className="w-auto flex-row-reverse justify-end gap-2 border-none p-0"
                label="Запам'ятати"
                name={SignInFormFields.Remember}
              />
              <Link
                className="ml-auto text-sm underline-offset-4 hover:underline"
                href={Routes.ForgotPassword}
              >
                Забули пароль?
              </Link>
            </div>
            <div className="flex items-center justify-between gap-4">
              <Button className="w-full" type="submit">
                Увійти
              </Button>
            </div>
            <FormFooter onGoogleBtnClick={loginWithGoogle} />
          </div>
        </div>
      </form>
    </Form>
  );
};

export { SignInForm };
