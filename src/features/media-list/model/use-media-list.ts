import { api } from '@convex/api';
import { useAppState } from '@/shared/lib';
import { useItemsPerPage } from './use-items-per-page';
import { usePaginatedQuery } from 'convex/react';
import { useMemo } from 'react';

export const useMediaList = () => {
  const { currentFilter, genreFilter, sortBy, sortOrder } = useAppState();

  const initialNumItems = useItemsPerPage();

  const queryArgs = useMemo(() => {
    if (initialNumItems === 0) return 'skip';
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
    genreFilter,
    sortBy,
    sortOrder,
    isFirstLoading: status === 'LoadingFirstPage',
    isLoadingMore: status === 'LoadingMore',
    isEndOfPages: status === 'Exhausted',
  };
};
