"use client";

import {
  type FieldPath,
  type FieldValues,
  useFormContext,
} from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/shared/ui/form";
import type { InputProps } from "@/shared/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/shared/ui/input-otp";

export interface IFormInputOTPProps<T extends FieldValues> extends InputProps {
  name: FieldPath<T>;
  required?: boolean;
}

const FormInputOTP = <T extends FieldValues>({
  name,
  required,
}: IFormInputOTPProps<T>) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex w-full flex-col">
          <FormControl>
            <InputOTP
              containerClassName="justify-center"
              maxLength={6}
              {...field}
            >
              <InputOTPGroup>
                <InputOTPSlot className="h-14 w-14" index={0} />
                <InputOTPSlot className="h-14 w-14" index={1} />
                <InputOTPSlot className="h-14 w-14" index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot className="h-14 w-14" index={3} />
                <InputOTPSlot className="h-14 w-14" index={4} />
                <InputOTPSlot className="h-14 w-14" index={5} />
              </InputOTPGroup>
            </InputOTP>
          </FormControl>
          <FormMessage className="text-destructive" />
        </FormItem>
      )}
      rules={{ required }}
    />
  );
};

export { FormInputOTP };
