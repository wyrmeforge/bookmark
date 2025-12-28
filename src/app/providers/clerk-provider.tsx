"use client";

import { ClerkProvider as ClerkNextProvider } from "@clerk/nextjs";
import type { PropsWithChildren } from "react";
import { Routes } from "@/shared/enums/routes";

export const ClerkProvider = ({ children }: PropsWithChildren) => (
  <ClerkNextProvider
    publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    signInFallbackRedirectUrl={Routes.Home}
    signInUrl={Routes.SignIn}
    signUpFallbackRedirectUrl={Routes.Home}
    signUpUrl={Routes.SignUp}
  >
    {children}
  </ClerkNextProvider>
);
