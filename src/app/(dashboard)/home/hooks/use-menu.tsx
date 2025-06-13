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
import { AppStateContext } from '@/app/providers/app-state-provider';
import { api } from '../../../../../convex/_generated/api';

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
      title: 'Заплановано',
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
      key: Filters.Forbidden,
      title: 'Закинуто',
      icon: <LoaderCircleIcon />,
      value: moduleList?.abandoned,
    },
    {
      key: Filters.Abandoned,
      title: 'Відкладено',
      icon: <LoaderCircleIcon />,
      value: moduleList?.abandoned,
    },
    {
      key: Filters.Completed,
      title: 'Завершено',
      icon: <CheckCheckIcon />,
      value: moduleList?.complete,
    },
    {
      key: Filters.Favorite,
      title: 'Улюблені',
      icon: <HeartIcon />,
      value: moduleList?.is_favorite,
    },
  ];

  return { menu, updateFilter, currentFilter };
};
