import { z as u } from "zod";

const UPPERCASE_REGEX = /[A-Z]/;
const DIGIT_REGEX = /[0-9]/;

export const emailField = u
  .string({ required_error: "Поле обов'язкове" })
  .email("Невірний формат пошти");

export const passwordField = u
  .string({ required_error: "Поле обов'язкове" })
  .min(8, "Пароль має містити щонайменше 8 символів")
  .refine((val) => UPPERCASE_REGEX.test(val), {
    message: "Пароль має містити хоча б одну велику літеру",
  })
  .refine((val) => DIGIT_REGEX.test(val), {
    message: "Пароль має містити хоча б одну цифру",
  });
