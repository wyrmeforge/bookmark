"use client";

import { InfoIcon } from "lucide-react";
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
import { Input, type InputProps } from "@/shared/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

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
      render={({ field }) => (
        <FormItem className="flex w-full flex-col">
          {label && (
            <div className="flex items-center gap-1">
              <FormLabel
                className={cn({ "text-muted": disabled })}
                htmlFor={name}
              >
                {label}
              </FormLabel>
              {tooltipDescription && (
                <Tooltip>
                  <TooltipTrigger>
                    <InfoIcon size={16} />
                  </TooltipTrigger>
                  <TooltipContent align="end" side="right">
                    Введіть назву українською
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          )}
          <FormControl>
            <Input
              className={cn({ "border-red-500": haveError })}
              disabled={disabled}
              id={name}
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

export { FormInput };
