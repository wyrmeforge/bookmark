"use client";

import {
  type FieldPath,
  type FieldValues,
  useFormContext,
} from "react-hook-form";
import { cn } from "@/shared/lib/utils";
import { FormControl, FormField, FormItem, FormLabel } from "@/shared/ui/form";
import { Switch, type SwitchProps } from "@/shared/ui/switch";

export interface FormCheckboxProps<T extends FieldValues = FieldValues>
  extends SwitchProps {
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
  ...rest
}: FormCheckboxProps<T>) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
          const isDirectClick = (e.target as HTMLElement).closest(
            "button, input, label"
          );
          if (!(isDirectClick || disabled)) {
            field.onChange(!field.value);
          }
        };

        return (
          <FormItem
            className={cn(
              "flex w-full flex-row items-center justify-between gap-2 rounded-md border bg-background p-3 hover:cursor-pointer",
              className
            )}
            onClick={handleClick}
          >
            <FormLabel
              className={cn({ "text-muted": disabled })}
              htmlFor={name}
            >
              {label}
            </FormLabel>
            <FormControl>
              <Switch
                checked={field.value}
                className="!m-0"
                id={name}
                onCheckedChange={field.onChange}
                {...rest}
              />
            </FormControl>
          </FormItem>
        );
      }}
    />
  );
};

export { FormCheckbox };
