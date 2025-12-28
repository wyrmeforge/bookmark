import { z as u } from "zod";
import { passwordField } from "../../lib/validators";
import { SignInFormFields } from "../types";

export const SignInFormSchema = u.object({
  [SignInFormFields.Email]: u.string(),
  [SignInFormFields.Password]: passwordField,
  [SignInFormFields.Remember]: u.boolean().optional(),
});

export type SignInFormValues = u.infer<typeof SignInFormSchema>;
