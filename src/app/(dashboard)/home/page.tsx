'use client';

import { useUnityList } from '@/hooks/use-unity-list';

import Loader from '@/components/layout/loader';
import EntryCard from '@/features/unity-card';
import { Button } from '@/components/ui/button';
import DashboardHeader from './_components/header';

const Dashboard = () => {
  const { list, isListLoading, loadMore, isEndOfPages } = useUnityList();

  const handleLoadMore = () => loadMore(20);

  return (
    <div className='flex h-full flex-col overflow-hidden'>
      <DashboardHeader />
      <div className='mb-10 flex-1 overflow-auto pr-4'>
        {isListLoading ? (
          <Loader />
        ) : !list?.length ? (
          <div className='flex h-full items-center justify-center'>Пусто</div>
        ) : (
          <>
            <div className='grid-cols-container grid gap-4'>
              {list.map((data) => (
                <EntryCard unityData={data} key={data._id} />
              ))}
            </div>
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
  );
};

export default Dashboard;
