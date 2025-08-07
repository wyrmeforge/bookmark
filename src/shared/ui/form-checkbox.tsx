'use client';

import { cn } from '@/shared/lib/utils';
import { FieldValues, FieldPath, useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel } from '@/shared/ui/form';
import { Switch } from '@/shared/ui/switch';

export interface FormCheckboxProps<T extends FieldValues = FieldValues> {
  name: FieldPath<T>;
  label: string;
  disabled?: boolean;
  className?: string;
}

const FormCheckbox = <T extends FieldValues = FieldValues>({
  name,
  disabled,
  label,
  className,
}: FormCheckboxProps<T>) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
          const isDirectClick = (e.target as HTMLElement).closest(
            'button, input, label'
          );
          if (!isDirectClick && !disabled) {
            field.onChange(!field.value);
          }
        };

        return (
          <FormItem
            onClick={handleClick}
            className={cn(
              'flex w-full flex-row items-center justify-between gap-2 rounded-md border p-3 hover:cursor-pointer',
              className
            )}
          >
            <FormLabel
              htmlFor={name}
              className={cn({ 'text-muted': disabled })}
            >
              {label}
            </FormLabel>
            <FormControl>
              <Switch
                className='!m-0'
                id={name}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        );
      }}
    />
  );
};

export { FormCheckbox };
