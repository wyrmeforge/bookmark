"use client";

import { InfoIcon } from "lucide-react";
import { useCallback } from "react";
import {
  Controller,
  type FieldPath,
  type FieldValues,
  useFormContext,
} from "react-hook-form";
import { cn } from "@/shared/lib/utils";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import type { InputProps } from "@/shared/ui/input";
import { NumberInput } from "./number-input";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

export interface IFormStepperInputProps<T extends FieldValues>
  extends Omit<InputProps, "onChange" | "value"> {
  name: FieldPath<T>;
  label?: string;
  required?: boolean;
  step?: number;
  min?: number;
  hideMaxValue?: boolean;
  tooltipDescription?: string;
  max?: number;
}

export function FormStepperInput<T extends FieldValues>({
  name,
  label,
  required,
  hideMaxValue,
  disabled,
  step = 1,
  tooltipDescription,
  min,
  max,
}: IFormStepperInputProps<T>) {
  const {
    control,
    formState: { errors },
  } = useFormContext<T>();

  const clampValue = useCallback(
    (val: number) => {
      if (min !== undefined && val < min) return min;
      if (max !== undefined && val > max) return max;
      return val;
    },
    [min, max]
  );

  const haveError = !!errors[name];

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const value = Number(field.value) || 0;

        return (
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
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger className="-mt-2" type="button">
                      <InfoIcon size={16} />
                    </TooltipTrigger>
                    <TooltipContent align="end" side="top">
                      {tooltipDescription}
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            )}
            <FormControl>
              <NumberInput
                disabled={disabled}
                hideMaxValue={hideMaxValue}
                max={max}
                min={min}
                onChange={(v) => field.onChange(clampValue(v))}
                step={step}
                value={value}
              />
            </FormControl>
            {haveError && <FormMessage className="text-destructive" />}
          </FormItem>
        );
      }}
      rules={{ required }}
    />
  );
}
