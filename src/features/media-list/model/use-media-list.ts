import { api } from "@convex/api";
import { usePaginatedQuery } from "convex/react";
import { useMemo } from "react";
import { useAppState } from "@/shared/lib/app-state-provider";
import { useItemsPerPage } from "./use-items-per-page";

export const useMediaList = () => {
  const { currentFilter } = useAppState();

  const initialNumItems = useItemsPerPage();

  const queryArgs = useMemo(() => {
    if (initialNumItems === 0) {
      return "skip";
    }
    return { filter: currentFilter };
  }, [currentFilter, initialNumItems]);

  const {
    results: list,
    loadMore,
    status,
  } = usePaginatedQuery(api.lists.getList, queryArgs, { initialNumItems });

  return {
    list,
    loadMore,
    currentFilter,
    isFirstLoading: status === "LoadingFirstPage",
    isLoadingMore: status === "LoadingMore",
    isEndOfPages: status === "Exhausted",
  };
};
