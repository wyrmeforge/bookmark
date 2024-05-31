import React from 'react';
import { ThemeProvider } from './theme-provider';
import { ConvexClientProvider } from './convex-client-provider';
import { ClerkProvider } from './clerk-provider';

const Providers = ({ children }: { children: React.ReactNode }) => (
  <ClerkProvider>
    <ConvexClientProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </ConvexClientProvider>
  </ClerkProvider>
);

export default Providers;
