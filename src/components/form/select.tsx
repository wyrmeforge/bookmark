import React from 'react';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Control, FieldPath, FieldValues } from 'react-hook-form';

interface ISelectItem {
  value: string;
  label: string;
}

interface IFormSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder: string;
  items: ISelectItem[];
}

const FormSelect = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  items,
}: IFormSelectProps<T>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className='flex flex-col'>
        <FormLabel>{label}</FormLabel>
        <Select onValueChange={field.onChange} value={field.value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {items?.map((item) => (
              <SelectItem
                className='hover:cursor-pointer hover:bg-slate-900'
                key={item.value}
                value={item.value}
              >
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormItem>
    )}
  />
);

export default FormSelect;
