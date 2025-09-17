import { AuthErrorCodes } from '../model';

export const SIGN_UP_ERROR_MESSAGES: Record<string, string> = {
  [AuthErrorCodes.ACCOUNT_ALREADY_EXIST]:
    'Обліковий запис з такою поштою уже існує!',
};
