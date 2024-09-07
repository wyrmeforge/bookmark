import React from 'react';
import { ThemeProvider } from './theme-provider';
import { ConvexClientProvider } from './convex-client-provider';
import { ClerkProvider } from './clerk-provider';
import { TooltipProvider } from '../ui/tooltip';
import UnityStateProvider from './unity-state-provider';

const Providers = ({ children }: { children: React.ReactNode }) => (
  <ClerkProvider>
    <ConvexClientProvider>
      <ThemeProvider>
        <TooltipProvider>
          <UnityStateProvider>{children}</UnityStateProvider>
        </TooltipProvider>
      </ThemeProvider>
    </ConvexClientProvider>
  </ClerkProvider>
);

export default Providers;
