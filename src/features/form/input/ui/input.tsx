import { FieldValues } from 'react-hook-form';
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
  control,
  name,
  label,
  error,
  required,
  disabled,
  ...inputProps
}: IFormInputProps<T>) => (
  <FormField
    control={control}
    name={name}
    rules={{ required }}
    render={({ field }) => (
      <FormItem className='flex w-full flex-col'>
        {label && (
          <FormLabel htmlFor={name} className={cn({ 'text-muted': disabled })}>
            {label}
          </FormLabel>
        )}
        <FormControl>
          <Input
            id={name}
            className={cn({ 'border-red-500': !!error }, 'bg-transparent')}
            required={required}
            disabled={disabled}
            {...field}
            {...inputProps}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export { FormInput };
