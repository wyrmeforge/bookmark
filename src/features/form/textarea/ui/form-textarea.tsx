'use client';

import { FieldValues, useFormContext } from 'react-hook-form';
import { cn } from '@/shared/lib/utils';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';
import { Textarea } from '@/shared/ui/textarea';
import { IFormTextareaProps } from '../model/types';

const FormTextarea = <T extends FieldValues>({
  name,
  label,
  required,
  ...inputProps
}: IFormTextareaProps<T>) => {
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
          {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
          <FormControl>
            <Textarea
              id={name}
              className={cn(
                { 'border-red-500': haveError },
                'max-h-[500px] bg-transparent'
              )}
              required={required}
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

export { FormTextarea };
