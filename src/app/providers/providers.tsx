import type { PropsWithChildren } from "react";
import { AppStateProvider } from "@/shared/lib/app-state-provider";
import { Toaster } from "@/shared/ui/sonner";
import { TooltipProvider } from "@/shared/ui/tooltip";
import { ClerkProvider } from "./clerk-provider";
import { ConvexClientProvider } from "./convex-client-provider";
import { ThemeProvider } from "./theme-provider";

export const Providers = ({ children }: PropsWithChildren) => (
  <ClerkProvider>
    <ConvexClientProvider>
      <ThemeProvider>
        <TooltipProvider>
          <AppStateProvider>
            <Toaster position="top-left" richColors />
            {children}
          </AppStateProvider>
        </TooltipProvider>
      </ThemeProvider>
    </ConvexClientProvider>
  </ClerkProvider>
);
