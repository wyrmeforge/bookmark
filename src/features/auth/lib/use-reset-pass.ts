import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Routes } from "@/shared/enums/routes";
import type { ForgotPasswordFormValues } from "../model/schema/forgot-password";
import {
  RESET_STRATEGY,
  type UseResetPassProps,
  type UseResetPassReturn,
} from "../model/types/forgot-password";

export const useResetPass = ({
  setIsResetInitiated,
}: UseResetPassProps): UseResetPassReturn => {
  const router = useRouter();

  const { isLoaded, signIn, setActive } = useSignIn();

  const createAndSendResetMail = async ({
    email,
  }: ForgotPasswordFormValues) => {
    if (!(isLoaded && signIn)) {
      return;
    }

    try {
      await signIn.create({
        strategy: RESET_STRATEGY,
        identifier: email,
      });

      toast.success("Відправлено успішно!", {
        description: `На пошту ${email} було відправлено код для скидання паролю`,
      });

      setIsResetInitiated(true);
    } catch (err: unknown) {
      const message =
        (err instanceof Error && "errors" in err
          ? (err as { errors?: Array<{ longMessage?: string }> }).errors?.[0]
              ?.longMessage
          : undefined) || "Failed to send reset email.";
      console.error("Reset mail error:", message);
    }
  };

  const resetUserPassword = async ({
    verificationCode,
    password,
  }: ForgotPasswordFormValues) => {
    if (!(isLoaded && signIn)) {
      return;
    }

    try {
      const result = await signIn.attemptFirstFactor({
        strategy: RESET_STRATEGY,
        code: verificationCode,
        password,
      });

      if (result.status === "complete") {
        setActive({ session: result.createdSessionId });
        toast.success("Пароль змінено успішно!");
        router.push(Routes.SignIn);
      } else {
        console.log("Unexpected result:", result);
      }
    } catch (err: unknown) {
      const message =
        (err instanceof Error && "errors" in err
          ? (err as { errors?: Array<{ longMessage?: string }> }).errors?.[0]
              ?.longMessage
          : undefined) || "Password reset failed.";
      console.error("Reset error:", message);
    }
  };

  return {
    createAndSendResetMail,
    resetUserPassword,
  };
};
