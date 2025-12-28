"use client";

import { useEffect } from "react";
import { useAppState } from "../app-state-provider";

export const useCreateMediaShortcut = () => {
  const { toggleCreateSheet } = useAppState();
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "d") {
        e.preventDefault();
        console.log("g");
        toggleCreateSheet();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggleCreateSheet]);
};
