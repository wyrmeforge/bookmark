import { ReactNode } from 'react';
import { ThemeProvider } from './theme-provider';
import { ConvexClientProvider } from './convex-client-provider';
import { ClerkProvider } from './clerk-provider';
import { TooltipProvider } from '../ui/tooltip';
import AppStateProvider from './app-state-provider';

const Providers = ({ children }: { children: ReactNode }) => (
  <ClerkProvider>
    <ConvexClientProvider>
      <ThemeProvider>
        <TooltipProvider>
          <AppStateProvider>{children}</AppStateProvider>
        </TooltipProvider>
      </ThemeProvider>
    </ConvexClientProvider>
  </ClerkProvider>
);

export default Providers;
