"use client";

import { api } from "@convex/api";
import type { Id } from "@convex/dataModel";
import { useConvexAuth, useMutation } from "convex/react";
import { useEffect, useState } from "react";

export const useStoreUser = () => {
  const { isLoading, isAuthenticated } = useConvexAuth();

  const [userId, setUserId] = useState<Id<"users"> | null>(null);
  const storeUser = useMutation(api.users.store);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    async function createUser() {
      const id = await storeUser();

      setUserId(id);
    }

    createUser();

    return () => setUserId(null);
  }, [isAuthenticated, storeUser]);

  return {
    isLoading: isLoading || (isAuthenticated && userId === null),
    isAuthenticated: isAuthenticated && userId !== null,
  };
};
