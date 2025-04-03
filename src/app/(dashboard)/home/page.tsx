'use client';

import { useUnityList } from '@/hooks/use-unity-list';
import { IListItem } from '@/types/list';

import SidebarMenu from '@/features/sidebar-menu';
import Loader from '@/components/layout/loader';
import HomeHeader from './_components/header';
import EntryCard from '@/features/unity-card';

const EmptyState = () => (
  <div className='flex h-full w-full grow flex-col items-center justify-center gap-2 text-lg'>
    Пусто
  </div>
);

const UnityList = ({ list }: { list: IListItem[] }) => (
  <div
    className='grid w-full gap-4 pb-0 sm:pb-8'
    style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}
  >
    {list.map((data) => (
      <EntryCard unityData={data} key={data._id} />
    ))}
  </div>
);

const Dashboard = () => {
  const { list, isListLoading } = useUnityList();

  const isContentExist = !isListLoading && list?.length > 0;

  return (
    <div className='flex h-full gap-6'>
      <SidebarMenu />
      <div className='flex h-full grow flex-col gap-4 px-4 pb-20 transition-all sm:pb-10 sm:pl-6 sm:pr-20'>
        <HomeHeader />
        {isListLoading && <Loader />}
        {isContentExist ? <UnityList list={list} /> : <EmptyState />}
      </div>
    </div>
  );
};

export default Dashboard;
