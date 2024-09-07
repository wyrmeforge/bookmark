'use client';

import { Separator } from '@/components/ui/separator';
import React from 'react';

import { Button } from '@/components/ui/button';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useUser } from '@clerk/nextjs';

import UnityCard from '@/features/unity-card';
import { useUnityList } from '@/hooks/use-unity-list';
import { ListFilters, ListModules, ListSort } from '@/features/unity-list';
import CreateUnity from '@/features/unity-modify/create-unity';
import { IListItem } from '@/types/list';
import Loader from '@/components/loader';

const CtaButton = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant='secondary' className='h-9 w-[130px] sm:w-[140px]'>
        Додати
      </Button>
    </DialogTrigger>
    <DialogContent>
      <CreateUnity />
    </DialogContent>
  </Dialog>
);

const EmptyState = () => (
  <div className='flex h-full w-full grow flex-col items-center justify-center gap-2 text-lg'>
    Пусто
    <CtaButton />
  </div>
);

const UnityList = ({ list }: { list: IListItem[] }) => (
  <div className='mt-4 flex flex-col gap-4 sm:grid sm:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-6'>
    {list.map((data) => (
      <UnityCard {...data} key={data._id} />
    ))}
  </div>
);

const Dashboard = () => {
  const { user } = useUser();

  const { list, isListLoading } = useUnityList();

  const renderContent = () => {
    if (isListLoading || !list) {
      return <Loader />;
    }

    if (list.length > 0) {
      return <UnityList list={list} />;
    }

    return <EmptyState />;
  };

  return (
    <div className='flex h-full grow flex-col gap-4 px-10 pb-10'>
      <h2>Списки {user?.username || user?.fullName}</h2>
      <ListFilters />
      <Separator />
      <div className='flex items-center justify-between'>
        <ListModules />
        <div className='flex gap-4'>
          <ListSort />
          <CtaButton />
        </div>
      </div>
      {renderContent()}
    </div>
  );
};

export default Dashboard;
