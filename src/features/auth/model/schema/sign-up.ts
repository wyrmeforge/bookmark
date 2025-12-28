import { z as u } from "zod";
import { emailField, passwordField } from "../../lib/validators";
import { SignUpFormFields } from "../types";

export const SignUpFormSchema = u
  .object({
    [SignUpFormFields.Email]: emailField,
    [SignUpFormFields.Password]: passwordField,
    [SignUpFormFields.ConfirmPassword]: u.string(),
    [SignUpFormFields.Username]: u.string().optional(),
    [SignUpFormFields.VerificationCode]: u.string(),
  })
  .refine(
    (data) =>
      data[SignUpFormFields.Password] ===
      data[SignUpFormFields.ConfirmPassword],
    {
      path: [SignUpFormFields.ConfirmPassword],
      message: "Паролі не співпадають",
    }
  );

export type SignUpFormValues = u.infer<typeof SignUpFormSchema>;
