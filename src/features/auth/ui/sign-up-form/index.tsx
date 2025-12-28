"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/shared/ui/form";
import {
  SignUpFormSchema,
  type SignUpFormValues,
} from "../../model/schema/sign-up";
import { SignUpFlowSteps, SignUpFormFields } from "../../model/types/sign-up";
import { RegistrationStep } from "./registration-step";
import { VerificationStep } from "./verification-step";

const SignUpForm = () => {
  const [flowStep, setFlowStep] = useState<
    (typeof SignUpFlowSteps)[keyof typeof SignUpFlowSteps]
  >(SignUpFlowSteps.Registration);

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      [SignUpFormFields.Email]: "",
      [SignUpFormFields.Password]: "",
      [SignUpFormFields.ConfirmPassword]: "",
      [SignUpFormFields.Username]: "",
      [SignUpFormFields.VerificationCode]: "",
    },
    mode: "onChange",
  });

  const isRegistrationStep = flowStep === SignUpFlowSteps.Registration;

  return (
    <Form {...form}>
      {isRegistrationStep ? (
        <RegistrationStep setFlowStep={(step) => setFlowStep(step)} />
      ) : (
        <VerificationStep setFlowStep={(step) => setFlowStep(step)} />
      )}
    </Form>
  );
};

export { SignUpForm };
