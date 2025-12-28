import { AuthErrorCodes } from "../model/types/global";

export const SIGN_IN_ERROR_MESSAGES: Record<string, string> = {
  [AuthErrorCodes.ACCOUNT_NOT_FOUND]: "Такого облікового запису не знайдено.",
  [AuthErrorCodes.CREDENTIALS_INCORRECT]: "Неправильний логін або пароль!",
};
