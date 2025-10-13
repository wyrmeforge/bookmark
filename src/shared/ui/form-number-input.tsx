'use client';

import {
  FieldPath,
  FieldValues,
  useFormContext,
  Controller,
} from 'react-hook-form';
import { cn } from '@/shared/lib/utils';
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';
import { InputProps } from '@/shared/ui/input';
import { useCallback } from 'react';
import { NumberInput } from './number-input';
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';
import { InfoIcon } from 'lucide-react';

export interface IFormStepperInputProps<T extends FieldValues>
  extends Omit<InputProps, 'onChange' | 'value'> {
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
      rules={{ required }}
      render={({ field }) => {
        const value = Number(field.value) || 0;

        return (
          <FormItem className='flex w-full flex-col'>
            {label && (
              <div className='flex items-center gap-1'>
                <FormLabel
                  htmlFor={name}
                  className={cn({ 'text-muted': disabled })}
                >
                  {label}
                </FormLabel>
                {tooltipDescription && (
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger type='button' className='-mt-2'>
                      <InfoIcon size={16} />
                    </TooltipTrigger>
                    <TooltipContent side='top' align='end'>
                      {tooltipDescription}
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            )}
            <FormControl>
              <NumberInput
                value={value}
                onChange={(v) => field.onChange(clampValue(v))}
                min={min}
                hideMaxValue={hideMaxValue}
                max={max}
                step={step}
                disabled={disabled}
              />
            </FormControl>
            {haveError && <FormMessage className='text-destructive' />}
          </FormItem>
        );
      }}
    />
  );
}
