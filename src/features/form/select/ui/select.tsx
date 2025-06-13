'use';
import { useId, useMemo } from 'react';

import { FormControl, FormField, FormItem, FormLabel } from '@/shared/ui/form';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';

import { FieldValues } from 'react-hook-form';
import { IFormSelectProps } from '../model/types';

const FormSelect = <T extends FieldValues = FieldValues>({
  control,
  name,
  label,
  placeholder,
  items,
  disabled = false,
  className,
}: IFormSelectProps<T>) => {
  const id = useId();

  const options = useMemo(
    () =>
      items.map(({ value, label }) => (
        <SelectItem
          key={value}
          value={value}
          className='hover:cursor-pointer hover:bg-slate-900'
        >
          {label}
        </SelectItem>
      )),
    [items]
  );

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={`flex flex-col ${className ?? ''}`}>
          <FormLabel
            htmlFor={id}
            className={disabled ? 'text-muted' : undefined}
          >
            {label}
          </FormLabel>
          <Select
            onValueChange={field.onChange}
            value={field.value}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger id={id} aria-describedby={`${id}-description`}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>{options}</SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};

export { FormSelect };
