'use client';

import { Button } from '@/shared/ui/button';
import { useFormContext } from 'react-hook-form';
import { Routes } from '@/enums/routes';
import { FormInput } from '@/features/form/input';
import { FormFooter, FormHeader, PasswordInput } from '../components';
import { useRegistration } from '../../lib/use-registration';

import {
  ISignUpStepProps,
  SignUpFormFields,
  SignUpFormValues,
} from '../../model';

const RegistrationStep = ({ setFlowStep }: ISignUpStepProps) => {
  const { handleSubmit } = useFormContext<SignUpFormValues>();

  const { registerWithCredentials, registerWithGoogle } = useRegistration({
    setFlowStep,
  });

  const onSubmit = handleSubmit(registerWithCredentials);

  return (
    <form onSubmit={onSubmit} className='w-full px-10 py-6'>
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
