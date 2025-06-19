'use client';

import { FieldValues, useFormContext } from 'react-hook-form';
import { cn } from '@/shared/lib/utils';
import { Input } from '@/shared/ui/input';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';
import { IFormInputProps } from '../model/types';

const FormInput = <T extends FieldValues>({
  name,
  label,
  required,
  disabled,
  ...inputProps
}: IFormInputProps<T>) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const haveError = !!errors[name];

  return (
    <FormField
      control={control}
      name={name}
      rules={{ required }}
      render={({ field }) => (
        <FormItem className='flex w-full flex-col'>
          {label && (
            <FormLabel
              htmlFor={name}
              className={cn({ 'text-muted': disabled })}
            >
              {label}
            </FormLabel>
          )}
          <FormControl>
            <Input
              id={name}
              className={cn({ 'border-red-500': haveError }, 'bg-transparent')}
              required={required}
              disabled={disabled}
              {...field}
              {...inputProps}
            />
          </FormControl>
          <FormMessage className='text-destructive' />
        </FormItem>
      )}
    />
  );
};

export { FormInput };
