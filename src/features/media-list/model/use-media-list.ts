import { api } from '@convex/api';
import { useAppState, useStablePaginatedQuery } from '@/shared/lib';

export const useMediaList = () => {
  const { currentFilter, genreFilter, sortBy, sortOrder } = useAppState();

  const {
    results: list,
    loadMore,
    status,
  } = useStablePaginatedQuery(
    api.lists.getList,
    {
      filter: currentFilter,
      sortBy,
      sortOrder,
      genre: genreFilter,
    },
    { initialNumItems: 10 }
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
