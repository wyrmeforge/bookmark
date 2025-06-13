'use client';

import { ClerkProvider as ClerkNextProvider } from '@clerk/nextjs';
import { PropsWithChildren } from 'react';

export const ClerkProvider = ({ children }: PropsWithChildren) => (
  <ClerkNextProvider
    publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
  >
    {children}
  </ClerkNextProvider>
);
