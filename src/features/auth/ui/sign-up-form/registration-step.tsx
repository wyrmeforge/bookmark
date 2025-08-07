'use client';

import { Button } from '@/shared/ui/button';
import { useFormContext } from 'react-hook-form';
import { FormFooter, FormHeader, PasswordInput } from '../components';
import { useRegistration } from '../../lib/use-registration';

import {
  ISignUpStepProps,
  SignUpFormFields,
  SignUpFormValues,
} from '../../model';

import { Routes } from '@/shared/enums';
import { FormInput } from '@/shared/ui/form-input';

const RegistrationStep = ({ setFlowStep }: ISignUpStepProps) => {
  const { handleSubmit } = useFormContext<SignUpFormValues>();

  const { registerWithCredentials, registerWithGoogle } = useRegistration({
    setFlowStep,
  });

  const onSubmit = handleSubmit(registerWithCredentials);

  return (
    <form onSubmit={onSubmit} className='w-full px-4 py-6 md:px-10'>
      <FormHeader
        title='Ласкаво просимо!'
        question='Уже маєте акаунт?'
        ctaLabel='Увійти'
        ctaHref={Routes.SignIn}
      />
      <div className='grid gap-6'>
        <div className='grid gap-6'>
          <FormInput
            required
            type='email'
            placeholder='Введіть вашу пошту'
            name={SignUpFormFields.Email}
            label='Пошта'
          />
          <FormInput
            placeholder='Введіть нікнейм'
            name={SignUpFormFields.Username}
            label='Нікнейм'
          />
          <PasswordInput label='Пароль' name={SignUpFormFields.Password} />
          <PasswordInput
            label='Підтвердіть пароль'
            name={SignUpFormFields.ConfirmPassword}
          />
          <div className='flex items-center justify-between gap-4'>
            <Button type='submit' className='w-full '>
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
