import { z as u } from 'zod';

export enum FormFields {
  Email = 'email',
  Password = 'password',
  Code = 'code',
}

export const createFormSchema = (isSignUp?: boolean) => {
  return u.object({
    [FormFields.Email]: u
      .string({ required_error: "Поле обов'язкове" })
      .email('Невірний формат пошти'),
    [FormFields.Password]: isSignUp
      ? u
          .string({ required_error: "Поле обов'язкове" })
          .min(8, 'Пароль має містити щонайменше 8 символів')
      : u.string(),
    [FormFields.Code]: isSignUp
      ? u.string({ required_error: "Поле обов'язкове" })
      : u.string(),
  });
};
