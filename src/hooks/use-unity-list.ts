import { usePaginatedQuery } from 'convex/react';
import { useContext } from 'react';
import { api } from '../../convex/_generated/api';
import { AppStateContext } from '@/components/providers/app-state-provider';

export const useUnityList = () => {
  const { currentFilter, layoutView, searchValue } =
    useContext(AppStateContext);

  // Api call
  const {
    results: list,
    loadMore,
    status,
  } = usePaginatedQuery(
    api.lists.getList,
    { filter: currentFilter, searchValue },
    { initialNumItems: 10 }
  );

  return {
    list,
    currentFilter,
    layoutView,
    isListLoading: status === 'LoadingFirstPage',
    loadMore,
    isEndOfPages: status === 'Exhausted',
  };
};
