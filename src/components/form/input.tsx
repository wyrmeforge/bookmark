import React, { HTMLInputTypeAttribute } from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { cn } from '@/lib/utils';

interface IFormInputProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  type?: HTMLInputTypeAttribute;
  error?: string;
}

const FormInput = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  disabled,
  required,
  type,
  error,
}: IFormInputProps<T>) => (
  <FormField
    control={control}
    name={name}
    rules={{ required }}
    render={({ field }) => (
      <FormItem className='flex w-full flex-col'>
        <FormLabel htmlFor={name} className={cn({ 'text-muted': disabled })}>
          {label}
        </FormLabel>
        <FormControl>
          <Input
            // id={name}
            type={type}
            className={cn({ 'border-red-500': !!error }, 'bg-transparent')}
            required={required}
            disabled={disabled}
            placeholder={placeholder}
            {...field}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default FormInput;
