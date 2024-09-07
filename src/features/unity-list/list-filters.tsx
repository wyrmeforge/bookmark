import React, { useContext } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import {
  CheckCheck,
  Eye,
  Goal,
  Heart,
  LoaderCircle,
  Sword,
} from 'lucide-react';
import { useQuery } from 'convex/react';
import { Module } from '@/enums/modules';
import { Filters } from '@/enums/filters';
import { UnityStateContext } from '@/components/providers/unity-state-provider';
import { api } from '../../../convex/_generated/api';

export const ListFilters = () => {
  const { currentFilter, currentModule, setCurrentFilter } =
    useContext(UnityStateContext);

  const moduleList = useQuery(api.lists.getListModules, {
    module: currentModule,
  });

  const filters = [
    {
      key: Filters.All,
      title: 'Всі',
      icon: <Sword />,
      value: moduleList?.all,
      isVisible: true,
    },
    {
      key: Filters.InFuture,
      title: 'Буду дивитись',
      icon: <Goal />,
      value: moduleList?.in_future,
      isVisible: true,
    },
    {
      key: Filters.InProgress,
      title: 'Дивлюсь',
      icon: <Eye />,
      value: moduleList?.in_progress,
      isVisible:
        currentModule !== Module.Movie && currentModule !== Module.Cartoon,
    },
    {
      key: Filters.Abandoned,
      title: 'Закинуто',
      icon: <LoaderCircle />,
      value: moduleList?.abandoned,
      isVisible:
        currentModule !== Module.Movie && currentModule !== Module.Cartoon,
    },
    {
      key: Filters.Favorite,
      title: 'Улюблені',
      icon: <Heart />,
      value: moduleList?.is_favorite,
      isVisible: true,
    },
    {
      key: Filters.Completed,
      title: 'Переглянуто',
      icon: <CheckCheck />,
      value: moduleList?.complete,
      isVisible: true,
    },
  ].filter((item) => !!item.isVisible);

  return (
    <div className='grid gap-4 transition-all sm:auto-cols-fr sm:grid-flow-col-dense sm:grid-rows-1'>
      {filters?.map(({ key, title, value, icon }) => (
        <Card
          onClick={() => setCurrentFilter(key)}
          key={key}
          className={`flex flex-col justify-between rounded-xl ${key === currentFilter ? 'bg-muted' : 'bg-transparent'} transition-all hover:cursor-pointer hover:border-gray-50 hover:bg-muted`}
        >
          <CardHeader className='flex flex-row items-center justify-between space-y-0 p-6 pb-2'>
            <CardTitle className='text-md'>{title}</CardTitle>
            {icon}
          </CardHeader>
          <CardContent>
            <p className='text-lg font-bold'>{value || 0}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
