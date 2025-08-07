import { usePaginatedQuery } from 'convex/react';
import { api } from '@convex/api';
import { useAppState } from '@/shared/lib';

export const useMediaList = () => {
  const { currentFilter, searchValue } = useAppState();

  const {
    results: list,
    loadMore,
    status,
  } = usePaginatedQuery(
    api.lists.getList,
    { filter: currentFilter, searchValue },
    { initialNumItems: 20 }
  );

  return {
    list,
    currentFilter,
    isFirstLoading: status === 'LoadingFirstPage',
    isLoadingMore: status === 'LoadingMore',
    loadMore,
    isEndOfPages: status === 'Exhausted',
  };
};
