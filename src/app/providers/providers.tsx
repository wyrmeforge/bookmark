import { PropsWithChildren } from 'react';
import { ThemeProvider } from './theme-provider';
import { ConvexClientProvider } from './convex-client-provider';
import { ClerkProvider } from './clerk-provider';
import { TooltipProvider } from '@/shared/ui/tooltip';
import { Toaster } from '@/shared/ui/sonner';
import { AppStateProvider } from '@/shared/lib';

export const Providers = ({ children }: PropsWithChildren) => (
  <ClerkProvider>
    <ConvexClientProvider>
      <ThemeProvider>
        <TooltipProvider>
          <AppStateProvider>
            <Toaster position='top-left' richColors />
            {children}
          </AppStateProvider>
        </TooltipProvider>
      </ThemeProvider>
    </ConvexClientProvider>
  </ClerkProvider>
);
