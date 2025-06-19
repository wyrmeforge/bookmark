import { useState, useCallback } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

import { Button } from '@/shared/ui/button';

import { FormInput } from '@/features/form/input';

interface IPasswordInputProps {
  name: string;
  label: string;
}

const PasswordInput = ({ name, label }: IPasswordInputProps) => {
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
      <FormInput
        label={label}
        required
        type={inputType}
        placeholder='*******'
        name={name}
        endAdornment={
          <Button
            type='button'
            onClick={togglePasswordVisibility}
            variant='ghost'
            size='icon'
            aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
          >
            {visibilityIcon}
          </Button>
        }
      />
    </div>
  );
};

export { PasswordInput };
