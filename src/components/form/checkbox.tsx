import React from 'react';
import { FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Switch } from '../ui/switch';
import { cn } from '@/lib/utils';
import { Control, FieldPath, FieldValues } from 'react-hook-form';

interface IFormCheckboxProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  disabled?: boolean;
}

const FormCheckbox = <T extends FieldValues>({
  control,
  name,
  disabled,
  label,
}: IFormCheckboxProps<T>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className='flex w-full flex-row items-center justify-between rounded-md border p-3'>
        <FormLabel className={cn({ 'text-muted': disabled })}>
          {label}
        </FormLabel>
        <FormControl>
          <Switch
            disabled={disabled}
            className='!mt-0'
            checked={field.value}
            onCheckedChange={field.onChange}
          />
        </FormControl>
      </FormItem>
    )}
  />
);

export default FormCheckbox;
