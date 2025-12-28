"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { PropsWithChildren } from "react";

export const ThemeProvider = ({ children }: PropsWithChildren) => (
  <NextThemesProvider
    attribute="class"
    defaultTheme="dark"
    disableTransitionOnChange
    enableSystem
  >
    {children}
  </NextThemesProvider>
);
