'use client';

import { useUnityList } from '@/hooks/use-unity-list';

import EntryCard from '@/features/unity-card';
import DashboardHeader from './_components/header';
import {
  BadgePlusIcon,
  ClapperboardIcon,
  Grid3x3Icon,
  Grid3X3Icon,
  ListIcon,
  LogOutIcon,
  OrigamiIcon,
  SquarePlusIcon,
  TvIcon,
} from 'lucide-react';
import CreateUnity from '@/features/unity-modify/create-unity';
import React, { useState } from 'react';
import UnityTable from '@/features/unity-table';
import { useClerk } from '@clerk/nextjs';
import { Routes } from '@/enums/routes';
import { Button } from '@/shared/ui/button';
import { Loader } from '@/shared/ui/loader';

const EmptyShit = () => {
  return (
    <div className='flex h-full w-full items-end justify-end'>
      <div className='relative flex items-center'>
        Почніть додавати
        <svg
          className='absolute left-0 top-0'
          fill='#ffffff'
          version='1.1'
          id='Capa_1'
          xmlns='http://www.w3.org/2000/svg'
          width='64px'
          height='64px'
          viewBox='0 0 421.943 421.944'
          stroke='#ffffff'
        >
          <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
          <g
            id='SVGRepo_tracerCarrier'
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke='#CCCCCC'
            stroke-width='1.687772'
          ></g>
          <g id='SVGRepo_iconCarrier'>
            <g>
              <path d='M418.054,273.641c-17.748-11.016-33.66-23.868-48.348-38.556c-4.896-4.896-13.464-1.225-13.464,5.508 c0,5.508-0.612,11.016-0.612,16.523c-53.244,9.792-106.488,14.076-160.957,14.688c-45.9,1.224-107.712,6.12-149.328-15.912 c-31.824-17.136-36.72-56.917-23.256-87.517c5.508-12.852,15.3-23.256,27.54-30.6c14.076-8.568,28.152-3.672,42.84-7.344 c1.836-0.612,2.448-3.06,1.224-4.896c-22.644-23.868-62.424,3.672-77.112,23.256c-20.808,27.54-22.032,67.933-3.672,96.696 c26.928,42.841,91.188,39.78,134.64,41.004c68.544,2.448,140.76,0.612,208.081-14.688c0,6.12,0.612,11.628,2.448,17.748 c0,1.224,0.611,1.836,1.224,2.448c-4.896,4.283-0.612,15.3,7.956,13.464c17.748-3.672,35.496-9.181,52.02-17.136 C423.562,284.657,422.338,276.701,418.054,273.641z M370.93,257.729c8.568,7.344,17.136,14.688,26.928,21.42 c-8.567,3.672-17.748,6.12-26.928,8.568c0-0.612,0-1.225,0-2.448C369.094,276.089,369.706,266.909,370.93,257.729z'></path>{' '}
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [view, setView] = useState<'grid' | 'table'>('grid');
  const { list, isListLoading, loadMore, isEndOfPages } = useUnityList();

  const handleLoadMore = () => loadMore(20);

  const isGridView = view === 'grid';

  const { signOut } = useClerk();

  const handleLogout = () => {
    signOut({ redirectUrl: Routes.SignIn });
  };

  return (
    <div className='flex h-full flex-row'>
      <div className='fixed bottom-10 left-5 flex flex-col gap-4'>
        <LogOutIcon onClick={handleLogout} />
      </div>
      <div className='fixed bottom-1/2 left-5 flex translate-y-1/2 flex-col gap-4'>
        <Button
          onClick={() => setView('grid')}
          size='icon'
          className='m-0 size-6 bg-transparent p-0 [&_svg]:size-6'
        >
          <Grid3x3Icon color={isGridView ? 'white' : 'grey'} />
        </Button>
        <Button
          onClick={() => setView('table')}
          size='icon'
          className='m-0 size-6 bg-transparent p-0 [&_svg]:size-6'
        >
          <ListIcon color={!isGridView ? 'white' : 'grey'} />
        </Button>
      </div>
      <div className='mx-auto flex h-full w-full  flex-col justify-center'>
        <DashboardHeader />
        <div className='relative flex-1 overflow-auto pb-6 pr-4'>
          {isListLoading ? (
            <Loader variant='absolute' />
          ) : !list?.length ? (
            <EmptyShit />
          ) : (
            <>
              {isGridView ? (
                <div className='grid grid-cols-container gap-8'>
                  {list.map((data) => (
                    <EntryCard unityData={data} key={data._id} />
                  ))}
                </div>
              ) : (
                <UnityTable list={list} />
              )}
              {!isEndOfPages && (
                <div className='my-4 flex justify-center'>
                  <Button
                    onClick={handleLoadMore}
                    variant='secondary'
                    className='w-full max-w-48'
                  >
                    Завантажити ще
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div className='fixed bottom-1/2 right-10 flex translate-y-1/2 flex-col gap-4'>
        <OrigamiIcon />
        <TvIcon color='grey' />
        <ClapperboardIcon color='grey' />
      </div>
      <div className='fixed bottom-10 right-10 flex flex-col gap-4'>
        <CreateUnity>
          <Button
            size='icon'
            className='m-0 size-8 bg-transparent p-0 [&_svg]:size-8'
          >
            <SquarePlusIcon color='white' />
          </Button>
        </CreateUnity>
      </div>
    </div>
  );
};

export default Dashboard;
