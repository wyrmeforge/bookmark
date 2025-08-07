'use client';

import { FieldPath, FieldValues, useFormContext } from 'react-hook-form';
import { cn } from '@/shared/lib/utils';
import { Input } from '@/shared/ui/input';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';

import { InputProps } from '@/shared/ui/input';
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';
import { InfoIcon } from 'lucide-react';

export interface IFormInputProps<T extends FieldValues> extends InputProps {
  name: FieldPath<T>;
  label?: string;
  required?: boolean;
  tooltipDescription?: string;
}

const FormInput = <T extends FieldValues>({
  name,
  label,
  required,
  disabled,
  tooltipDescription,
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
            <div className='flex items-center gap-1'>
              <FormLabel
                htmlFor={name}
                className={cn({ 'text-muted': disabled })}
              >
                {label}
              </FormLabel>
              {tooltipDescription && (
                <Tooltip>
                  <TooltipTrigger>
                    <InfoIcon size={16} />
                  </TooltipTrigger>
                  <TooltipContent side='right' align='end'>
                    Введіть назву українською
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
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
