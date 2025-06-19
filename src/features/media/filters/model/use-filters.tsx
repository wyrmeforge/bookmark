import { useQuery } from 'convex/react';
import { useContext, useMemo } from 'react';

import { AppStateContext } from '@/app/providers/app-state-provider';
import { api } from '@convex/api';
import { UseFiltersReturn } from './types';
import { MEDIA_FILTERS } from '@/shared/config/media/media-filters';

export const useFilters = (): UseFiltersReturn => {
  const { currentFilter, updateFilter } = useContext(AppStateContext);
  const moduleList = useQuery(api.lists.getListModules);

  const menu = useMemo(() => {
    return MEDIA_FILTERS.map(({ key, label, icon: Icon }) => ({
      key,
      title: label,
      icon: <Icon size={16} />,
      value: moduleList?.[key] ?? 0,
    }));
  }, [moduleList]);

  return { menu, currentFilter, updateFilter };
};
