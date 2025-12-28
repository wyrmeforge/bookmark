"use client";

import {
  type FieldPath,
  type FieldValues,
  useFormContext,
} from "react-hook-form";
import { cn } from "@/shared/lib/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Textarea } from "@/shared/ui/textarea";

export interface IFormTextareaProps<T extends FieldValues>
  extends React.ComponentProps<"textarea"> {
  name: FieldPath<T>;
  label?: string;
  required?: boolean;
}

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
      render={({ field }) => (
        <FormItem className="flex w-full flex-col">
          {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
          <FormControl>
            <Textarea
              className={cn({ "border-red-500": haveError }, "max-h-[100px]")}
              id={name}
              maxLength={100}
              required={required}
              {...field}
              {...inputProps}
            />
          </FormControl>
          <FormMessage className="text-destructive" />
        </FormItem>
      )}
      rules={{ required }}
    />
  );
};

export { FormTextarea };
