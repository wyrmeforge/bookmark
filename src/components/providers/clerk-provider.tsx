'use client';

import { ClerkProvider as ClerkNextProvider } from '@clerk/nextjs';

import * as React from 'react';

export function ClerkProvider({ children }: { children: React.ReactNode }) {
  return (
    <ClerkNextProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      {children}
    </ClerkNextProvider>
  );
}
