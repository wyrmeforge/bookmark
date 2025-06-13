import { PropsWithChildren } from 'react';
import { ThemeProvider } from './theme-provider';
import { ConvexClientProvider } from './convex-client-provider';
import { ClerkProvider } from './clerk-provider';
import AppStateProvider from './app-state-provider';
import { TooltipProvider } from '@/shared/ui/tooltip';
import { Toaster } from '@/shared/ui/toaster';

export const Providers = ({ children }: PropsWithChildren) => (
  <ClerkProvider>
    <ConvexClientProvider>
      <ThemeProvider>
        <TooltipProvider>
          <AppStateProvider>
            <Toaster />
            {children}
          </AppStateProvider>
        </TooltipProvider>
      </ThemeProvider>
    </ConvexClientProvider>
  </ClerkProvider>
);
