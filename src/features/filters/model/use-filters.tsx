import { useQuery } from 'convex/react';
import { useMemo } from 'react';

import { api } from '@convex/api';
import { UseFiltersReturn } from './types';
import { MEDIA_STATUS_FILTERS } from '@/shared/config';
import { useAppState } from '@/shared/lib';

export const useFilters = (): UseFiltersReturn => {
  const { currentFilter, updateFilter } = useAppState();
  const moduleList = useQuery(api.lists.getListModules);

  const menu = useMemo(() => {
    return MEDIA_STATUS_FILTERS.map(({ key, label, icon: Icon }) => ({
      key,
      title: label,
      icon: <Icon size={16} />,
      value: moduleList?.[key] ?? 0,
    }));
  }, [moduleList]);

  return { menu, currentFilter, updateFilter };
};
