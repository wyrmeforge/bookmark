import { UnityStateContext } from '@/components/providers/unity-state-provider';
import { useQuery } from 'convex/react';
import { useContext } from 'react';
import { api } from '../../convex/_generated/api';

export const useUnityList = () => {
  const { currentFilter, currentModule, sortModel } =
    useContext(UnityStateContext);

  const list = useQuery(api.lists.getList, {
    module: currentModule,
    status: currentFilter,
    sortBy: {
      value: sortModel.value,
      direction: sortModel.direction,
    },
  });

  return { list, isListLoading: list === undefined };
};
