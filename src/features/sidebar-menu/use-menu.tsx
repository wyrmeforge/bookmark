import { useQuery } from 'convex/react';
import { useContext } from 'react';
import { Filters } from '@/enums/filters';
import {
  CheckCheckIcon,
  EyeIcon,
  GoalIcon,
  HeartIcon,
  LoaderCircleIcon,
  SwordIcon,
} from 'lucide-react';
import { api } from '../../../convex/_generated/api';
import { AppStateContext } from '@/components/providers/app-state-provider';

export const useMenu = () => {
  const { currentFilter, updateFilter } = useContext(AppStateContext);

  const moduleList = useQuery(api.lists.getListModules);

  const menu = [
    {
      key: Filters.All,
      title: 'Всі',
      icon: <SwordIcon />,
      value: moduleList?.all,
    },
    {
      key: Filters.InFuture,
      title: 'Буду дивитись',
      icon: <GoalIcon />,
      value: moduleList?.in_future,
    },
    {
      key: Filters.InProgress,
      title: 'Дивлюсь',
      icon: <EyeIcon />,
      value: moduleList?.in_progress,
    },
    {
      key: Filters.Abandoned,
      title: 'Закинуто',
      icon: <LoaderCircleIcon />,
      value: moduleList?.abandoned,
    },
    {
      key: Filters.Favorite,
      title: 'Улюблені',
      icon: <HeartIcon />,
      value: moduleList?.is_favorite,
    },
    {
      key: Filters.Completed,
      title: 'Переглянуто',
      icon: <CheckCheckIcon />,
      value: moduleList?.complete,
    },
  ];

  return { menu, updateFilter, currentFilter };
};
