'use client';

import { useUnityList } from '@/hooks/use-unity-list';

import Loader from '@/components/layout/loader';
import EntryCard from '@/features/unity-card';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const { list, isListLoading, loadMore, isEndOfPages } = useUnityList();

  if (isListLoading) return <Loader />;

  if (list?.length <= 0) return <span>Пусто</span>;

  const onLoadMoreClick = () => {
    loadMore(20);
  };

  return (
    <>
      <div
        className='grid w-full gap-4 pb-0 sm:pb-8'
        style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        }}
      >
        {list.map((data) => (
          <EntryCard unityData={data} key={data._id} />
        ))}
      </div>
      {!isEndOfPages && (
        <Button
          onClick={onLoadMoreClick}
          variant='ghost'
          className='m-auto w-full max-w-48'
        >
          Завантажити ще
        </Button>
      )}
    </>
  );
};

export default Dashboard;
