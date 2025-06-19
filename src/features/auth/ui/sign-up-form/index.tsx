'use client';

import { useForm } from 'react-hook-form';
import { RegistrationStep } from './registration-step';
import { VerificationStep } from './verification-step';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/shared/ui/form';

import {
  SignUpFlowSteps,
  SignUpFormFields,
  SignUpFormSchema,
  SignUpFormValues,
} from '../../model';

const SignUpForm = () => {
  const [flowStep, setFlowStep] = useState<SignUpFlowSteps>(
    SignUpFlowSteps.Registration
  );

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      [SignUpFormFields.Email]: '',
      [SignUpFormFields.Password]: '',
      [SignUpFormFields.ConfirmPassword]: '',
      [SignUpFormFields.Username]: '',
      [SignUpFormFields.VerificationCode]: '',
    },
    mode: 'onChange',
  });

  const isRegistrationStep = flowStep === SignUpFlowSteps.Registration;

  return (
    <Form {...form}>
      {isRegistrationStep ? (
        <RegistrationStep setFlowStep={setFlowStep} />
      ) : (
        <VerificationStep setFlowStep={setFlowStep} />
      )}
    </Form>
  );
};

export { SignUpForm };
