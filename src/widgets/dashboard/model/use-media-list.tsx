import { usePaginatedQuery } from 'convex/react';
import { useContext } from 'react';
import { AppStateContext } from '@/app/providers/app-state-provider';
import { api } from '@convex/api';

export const useMediaList = () => {
  const { currentFilter, searchValue } = useContext(AppStateContext);

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
    isListLoading: status === 'LoadingFirstPage' || status === 'LoadingMore',
    loadMore,
    isEndOfPages: status === 'Exhausted',
  };
};
