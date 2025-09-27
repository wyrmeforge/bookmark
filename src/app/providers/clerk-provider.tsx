'use client';

import { Routes } from '@/shared/enums';
import { ClerkProvider as ClerkNextProvider } from '@clerk/nextjs';
import { PropsWithChildren } from 'react';

export const ClerkProvider = ({ children }: PropsWithChildren) => (
  <ClerkNextProvider
    publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    signInUrl={Routes.SignIn}
    signUpUrl={Routes.SignUp}
    signInFallbackRedirectUrl={Routes.Home}
    signUpFallbackRedirectUrl={Routes.Home}
  >
    {children}
  </ClerkNextProvider>
);
