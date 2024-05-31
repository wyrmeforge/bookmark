'use client';
import { TypographyH2 } from '@/components/typography/h2';

import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React, { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { Module } from '@/enums/modules';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useUser } from '@clerk/nextjs';
import ModuleFilters from './components/module-filters';
import UnityCard from './components/card';
import CreateUnity from '@/components/features/create-unity';
import { Filters } from '@/enums/filters';
import { useSearchMovie } from '@/hooks/useSearchMovie';
import { ArrowDown, ArrowUp } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Sort from '@/components/list/sort';

const Dashboard = () => {
  const { user } = useUser();

  const [currentFilter, setCurrentFilter] = useState(Filters.All);
  const [currentModule, setCurrentModule] = useState(Module.Anime);
  const [sort, setSort] = useState({
    label: 'За датою додавання',
    value: 'date',
    direction: 'asc',
  });

  const list = useQuery(api.lists.sortListBy, {
    module: currentModule,
    status: currentFilter,
    sortBy: sort.direction,
  });

  const isListLoading = list === undefined;

  const modules = [
    { name: Module.Anime, label: 'Аніме' },
    { name: Module.Movie, label: 'Фільми' },
    { name: Module.Cartoon, label: 'Мульти' },
  ];

  const CtaButton = () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='h-9 w-[130px] sm:w-[140px]'>Додати</Button>
      </DialogTrigger>
      <DialogContent>
        <CreateUnity
          currentFilter={currentFilter}
          currentModule={currentModule}
          list={list}
        />
      </DialogContent>
    </Dialog>
  );

  return (
    <div className='flex h-full grow flex-col gap-4 px-10 pb-10'>
      <TypographyH2 text={`Списки ${user?.username || user?.fullName}`} />
      <ModuleFilters
        currentModule={currentModule}
        currentFilter={currentFilter}
        setCurrentFilter={setCurrentFilter}
      />
      <Separator />
      <div className='flex items-center justify-between'>
        <Tabs className='h-full' defaultValue={Module.Anime}>
          <TabsList className='h-9'>
            {modules?.map((module) => (
              <TabsTrigger
                onClick={() => setCurrentModule(module.name)}
                key={module.name}
                className='px-3 py-1 text-sm'
                value={module.name}
              >
                {module.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className='flex gap-4'>
          <Sort sort={sort} setSort={setSort} />
          <CtaButton />
        </div>
      </div>
      {isListLoading ? (
        <div className='flex h-full w-full grow flex-col items-center justify-center gap-2 text-lg'>
          <div
            className='inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
            role='status'
          ></div>
        </div>
      ) : list.length > 0 ? (
        <div className='mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5  2xl:grid-cols-6'>
          {list?.map((data) => (
            <UnityCard
              id={data._id}
              episode={data.episode}
              season={data.season}
              rate={data.rate}
              name={data.name}
              date={data._creationTime}
              imageUrl={data.imageUrl}
              isFavorite={data.is_favorite}
              key={data._id}
            />
          ))}
        </div>
      ) : (
        <div className='flex h-full w-full grow flex-col items-center justify-center gap-2 text-lg'>
          Тут пусто
          <CtaButton />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
