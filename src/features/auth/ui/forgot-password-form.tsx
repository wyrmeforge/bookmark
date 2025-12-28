"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Routes } from "@/shared/enums";
import { Button } from "@/shared/ui/button";
import { CardHeader, CardTitle } from "@/shared/ui/card";
import { Form } from "@/shared/ui/form";
import { FormInput } from "@/shared/ui/form-input";
import { useResetPass } from "../lib/use-reset-pass";

import {
  ForgotPasswordFormFields,
  type ForgotPasswordFormValues,
  ForgotPasswordStep1Schema,
  ForgotPasswordStep2Schema,
} from "../model";
import { PasswordInput } from "./components";

const ForgotPasswordForm = () => {
  const router = useRouter();
  const [isResetInitiated, setIsResetInitiated] = useState(false);

  const { createAndSendResetMail, resetUserPassword } = useResetPass({
    setIsResetInitiated,
  });

  const schema = isResetInitiated
    ? ForgotPasswordStep2Schema
    : ForgotPasswordStep1Schema;

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      [ForgotPasswordFormFields.Email]: "",
      [ForgotPasswordFormFields.Password]: "",
      [ForgotPasswordFormFields.ConfirmPassword]: "",
      [ForgotPasswordFormFields.VerificationCode]: "",
    },
    mode: "onChange",
  });

  const submitFn = isResetInitiated
    ? resetUserPassword
    : createAndSendResetMail;

  const onSubmit = form.handleSubmit(submitFn);

  const handleGoBack = () => {
    if (isResetInitiated) {
      setIsResetInitiated(false);
    } else {
      router.push(Routes.SignIn);
    }
  };

  const description = isResetInitiated
    ? "Введіть новий пароль"
    : " Введіть пошту на яку буде надіслано код для скидання паролю";
  const ctaButton = isResetInitiated ? "Змінити" : "Далі";

  return (
    <Form {...form}>
      <form className="w-full px-4 py-6 md:px-10" onSubmit={onSubmit}>
        <CardHeader className="px-0 text-center">
          <CardTitle className="text-2xl">Відновлення паролю</CardTitle>
          <div className="flex flex-row items-center justify-center gap-2">
            <div className="text-center text-grey text-sm">{description}</div>
          </div>
        </CardHeader>
        <div className="mb-6 flex flex-col gap-6">
          {isResetInitiated ? (
            <>
              <FormInput
                key={ForgotPasswordFormFields.VerificationCode}
                label="Верифікаційний код"
                name={ForgotPasswordFormFields.VerificationCode}
                placeholder={"Введіть код надісланий Вам на пошту"}
                required
                type="code"
              />
              <PasswordInput
                label="Новий пароль"
                name={ForgotPasswordFormFields.Password}
              />
              <PasswordInput
                label="Підтвердіть пароль"
                name={ForgotPasswordFormFields.ConfirmPassword}
              />
            </>
          ) : (
            <FormInput
              key={ForgotPasswordFormFields.Email}
              label="Пошта"
              name={ForgotPasswordFormFields.Email}
              placeholder="Введіть вашу пошту"
              required
              type="email"
            />
          )}
        </div>
        <div className="flex items-center justify-between gap-4">
          <Button
            className="w-full"
            onClick={handleGoBack}
            type="button"
            variant="outline"
          >
            Назад
          </Button>
          <Button className="w-full" type="submit">
            {ctaButton}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export { ForgotPasswordForm };
