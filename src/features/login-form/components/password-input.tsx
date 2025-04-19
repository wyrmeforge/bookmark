import React, { useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { Control } from 'react-hook-form';

import FormInput from '@/components/form/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Routes } from '@/enums/routes';

import { AuthCredentials } from '../types';

interface IPasswordInputProps {
  isSignUp?: boolean;
  control: Control<AuthCredentials>;
}

const PasswordInput: React.FC<IPasswordInputProps> = ({
  isSignUp,
  control,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setIsPasswordVisible((prev) => !prev);
    },
    []
  );

  const inputType = isPasswordVisible ? 'text' : 'password';
  const visibilityIcon = isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />;

  return (
    <div className='grid gap-2'>
      <div className='flex items-center'>
        <Label htmlFor='password'>
          {isSignUp ? 'Придумайте пароль' : 'Пароль'}
        </Label>
        {!isSignUp && (
          <Link
            href={Routes.ForgotPassword}
            className='ml-auto text-sm underline-offset-4 hover:underline'
          >
            Забули пароль?
          </Link>
        )}
      </div>
      <FormInput
        required
        type={inputType}
        control={control}
        name='password'
        endAdornment={
          <Button
            onClick={togglePasswordVisibility}
            variant='ghost'
            size='icon'
            aria-label={
              isPasswordVisible ? 'Приховати пароль' : 'Показати пароль'
            }
          >
            {visibilityIcon}
          </Button>
        }
      />
    </div>
  );
};

export default PasswordInput;
