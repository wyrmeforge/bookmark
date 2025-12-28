import { AuthErrorCodes } from "../model/types/global";

export const SIGN_UP_ERROR_MESSAGES: Record<string, string> = {
  [AuthErrorCodes.ACCOUNT_ALREADY_EXIST]:
    "Обліковий запис з такою поштою уже існує!",
};
