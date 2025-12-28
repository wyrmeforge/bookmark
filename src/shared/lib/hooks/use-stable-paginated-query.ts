"use client";

import { usePaginatedQuery } from "convex/react";
import { useRef } from "react";

export const useStablePaginatedQuery = ((name, ...args) => {
  const result = usePaginatedQuery(name, ...args);
  const stored = useRef(result);

  if (result.status !== "LoadingMore") {
    stored.current = result;
  }

  return stored.current;
}) as typeof usePaginatedQuery;
