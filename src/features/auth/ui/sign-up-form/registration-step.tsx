"use client";

import { useFormContext } from "react-hook-form";
import { Routes } from "@/shared/enums";
import { Button } from "@/shared/ui/button";
import { FormInput } from "@/shared/ui/form-input";
import { useRegistration } from "../../lib/use-registration";
import {
  type ISignUpStepProps,
  SignUpFormFields,
  type SignUpFormValues,
} from "../../model";
import { FormFooter, FormHeader, PasswordInput } from "../components";

const RegistrationStep = ({ setFlowStep }: ISignUpStepProps) => {
  const { handleSubmit } = useFormContext<SignUpFormValues>();

  const { registerWithCredentials, registerWithGoogle } = useRegistration({
    setFlowStep,
  });

  const onSubmit = handleSubmit(registerWithCredentials);

  return (
    <form className="w-full px-4 py-6 md:px-10" onSubmit={onSubmit}>
      <FormHeader
        ctaHref={Routes.SignIn}
        ctaLabel="Увійти"
        question="Уже маєте акаунт?"
        title="Ласкаво просимо!"
      />
      <div className="grid gap-6">
        <div className="grid gap-6">
          <FormInput
            label="Пошта"
            name={SignUpFormFields.Email}
            placeholder="Введіть вашу пошту"
            required
            type="email"
          />
          <FormInput
            label="Нікнейм"
            name={SignUpFormFields.Username}
            placeholder="Введіть нікнейм"
          />
          <PasswordInput label="Пароль" name={SignUpFormFields.Password} />
          <PasswordInput
            label="Підтвердіть пароль"
            name={SignUpFormFields.ConfirmPassword}
          />
          <div className="flex items-center justify-between gap-4">
            <Button className="w-full" type="submit">
              Надіслати код підтвердження
            </Button>
          </div>
          <FormFooter onGoogleBtnClick={registerWithGoogle} />
        </div>
      </div>
    </form>
  );
};

export { RegistrationStep };
