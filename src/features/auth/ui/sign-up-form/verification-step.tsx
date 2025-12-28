"use client";

import { useFormContext } from "react-hook-form";
import { Button } from "@/shared/ui/button";

import { CardHeader, CardTitle } from "@/shared/ui/card";
import { FormInputOTP } from "@/shared/ui/form-input-otp";
import { useVerify } from "../../lib/use-verify";
import {
  type ISignUpStepProps,
  SignUpFlowSteps,
  SignUpFormFields,
  type SignUpFormValues,
} from "../../model";

const VerificationStep = ({ setFlowStep }: ISignUpStepProps) => {
  const { handleSubmit } = useFormContext<SignUpFormValues>();
  const { verifyAccount } = useVerify({ setFlowStep });

  const onSubmit = handleSubmit(verifyAccount);

  const handleGoBack = () => {
    setFlowStep(SignUpFlowSteps.Registration);
  };

  return (
    <form className="w-full px-4 py-6 md:px-10" onSubmit={onSubmit}>
      <CardHeader className="px-0 text-center">
        <CardTitle className="text-2xl">Верифікація</CardTitle>
        <div className="flex flex-row items-center justify-center text-center text-grey text-sm">
          Введіть верифікаційний код відправлений вам на пошту
        </div>
      </CardHeader>
      <div className="grid gap-6">
        <div className="grid gap-6">
          <FormInputOTP name={SignUpFormFields.VerificationCode} required />
          <div className="flex flex-row items-center justify-between gap-4">
            <Button className="w-full" onClick={handleGoBack} variant="outline">
              Назад
            </Button>
            <Button className="w-full" type="submit">
              Зареєструватись
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export { VerificationStep };
