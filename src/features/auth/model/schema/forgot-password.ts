import { z as u } from "zod";
import { emailField, passwordField } from "../../lib/validators";
import { ForgotPasswordFormFields } from "../types";

export const ForgotPasswordStep1Schema = u.object({
  [ForgotPasswordFormFields.Email]: emailField,
});

export const ForgotPasswordStep2Schema = u
  .object({
    [ForgotPasswordFormFields.Password]: passwordField,
    [ForgotPasswordFormFields.ConfirmPassword]: u.string(),
    [ForgotPasswordFormFields.VerificationCode]: u.string(),
  })
  .refine(
    (data) =>
      data[ForgotPasswordFormFields.Password] ===
      data[ForgotPasswordFormFields.ConfirmPassword],
    {
      path: [ForgotPasswordFormFields.ConfirmPassword],
      message: "Паролі не співпадають",
    }
  );

export type ForgotPasswordFormValues = u.infer<
  typeof ForgotPasswordStep1Schema
> &
  u.infer<typeof ForgotPasswordStep2Schema>;
