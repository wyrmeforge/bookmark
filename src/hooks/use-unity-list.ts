import { usePaginatedQuery } from 'convex/react';
import { useContext } from 'react';
import { api } from '../../convex/_generated/api';
import { AppStateContext } from '@/app/providers/app-state-provider';

export const useUnityList = () => {
  const { currentFilter, layoutView, searchValue } =
    useContext(AppStateContext);

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
    layoutView,
    isListLoading: status === 'LoadingFirstPage' || status === 'LoadingMore',
    loadMore,
    isEndOfPages: status === 'Exhausted',
  };
};
