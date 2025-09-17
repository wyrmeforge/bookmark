import { api } from '@convex/api';
import { useAppState, useStablePaginatedQuery } from '@/shared/lib';

export const useMediaList = () => {
  const { currentFilter } = useAppState();

  const {
    results: list,
    loadMore,
    status,
  } = useStablePaginatedQuery(
    api.lists.getList,
    { filter: currentFilter },
    { initialNumItems: 10 }
  );

  return {
    list,
    loadMore,
    currentFilter,
    isFirstLoading: status === 'LoadingFirstPage',
    isLoadingMore: status === 'LoadingMore',
    isEndOfPages: status === 'Exhausted',
  };
};
