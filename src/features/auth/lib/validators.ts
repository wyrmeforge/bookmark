import { z as u } from "zod";

export const emailField = u
  .string({ required_error: "Поле обов'язкове" })
  .email("Невірний формат пошти");

export const passwordField = u
  .string({ required_error: "Поле обов'язкове" })
  .min(8, "Пароль має містити щонайменше 8 символів")
  .refine((val) => /[A-Z]/.test(val), {
    message: "Пароль має містити хоча б одну велику літеру",
  })
  .refine((val) => /[0-9]/.test(val), {
    message: "Пароль має містити хоча б одну цифру",
  });
