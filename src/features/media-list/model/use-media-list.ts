import { api } from '@convex/api';
import { useAppState } from '@/shared/lib';
import { useItemsPerPage } from './use-items-per-page';
import { usePaginatedQuery } from 'convex/react';

export const useMediaList = () => {
  const { currentFilter, genreFilter, sortBy, sortOrder } = useAppState();

  const initialNumItems = useItemsPerPage();

  const {
    results: list,
    loadMore,
    status,
  } = usePaginatedQuery(
    api.lists.getList,
    initialNumItems === 0
      ? 'skip'
      : {
          filter: currentFilter,
        },
    { initialNumItems }
  );

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
