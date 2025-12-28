"use client";

import { useId, useMemo } from "react";
import {
  type FieldPath,
  type FieldValues,
  useFormContext,
} from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "@/shared/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

export interface ISelectItem {
  value: string;
  label: string;
}

export interface IFormSelectProps<T extends FieldValues = FieldValues> {
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  items: ISelectItem[];
  disabled?: boolean;
  className?: string;
}

const FormSelect = <T extends FieldValues = FieldValues>({
  name,
  label,
  placeholder,
  items,
  disabled = false,
  className,
}: IFormSelectProps<T>) => {
  const { control } = useFormContext();

  const id = useId();

  const options = useMemo(
    () =>
      items.map(({ value, label }) => (
        <SelectItem
          className="hover:cursor-pointer hover:bg-slate-900"
          key={value}
          value={value}
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
        <FormItem className={`flex flex-col ${className ?? ""}`}>
          <FormLabel
            className={disabled ? "text-muted" : undefined}
            htmlFor={id}
          >
            {label}
          </FormLabel>
          <Select
            disabled={disabled}
            onValueChange={field.onChange}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger aria-describedby={`${id}-description`} id={id}>
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
