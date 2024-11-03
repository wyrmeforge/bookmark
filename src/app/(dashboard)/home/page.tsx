'use client';

import UnityCard from '@/features/unity-card';
import { useUnityList } from '@/hooks/use-unity-list';
import { IListItem } from '@/types/list';
import UnityTable from '@/features/unity-table';

import SidebarMenu from '@/features/sidebar-menu';
import SearchInput from '@/features/search-input';
import Loader from '@/components/layout/loader';
import { Button } from '@/components/ui/button';
import { LayoutViews } from '@/enums/unity';
import CreateUnity from '@/features/unity-modify/create-unity';
import { PlusIcon } from 'lucide-react';
import MobileMenu from '@/features/mobile-menu';
import { getFilterTranslation } from '@/lib/helpers';

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
      <UnityCard unityData={data} key={data._id} />
    ))}
  </div>
);

const Dashboard = () => {
  const { list, layoutView, isEndOfPages, currentFilter, loadMore } =
    useUnityList();

  const renderContent = () => {
    if (list === undefined) {
      return <Loader variant='test' />;
    }
    if (list?.length > 0) {
      if (layoutView === LayoutViews.Grid) {
        return <UnityList list={list} />;
      } else {
        return <UnityTable list={list} />;
      }
    }

    return <EmptyState />;
  };

  return (
    <div className='flex h-full gap-6'>
      <SidebarMenu />
      <div className='flex h-full grow flex-col gap-4 px-4 pb-20 transition-all sm:pb-10 sm:pl-6 sm:pr-20'>
        <div className='flex items-center justify-between gap-4 px-2'>
          <div className='hidden w-full max-w-xl sm:block'>
            <SearchInput />
          </div>
          <div className=''>
            <h2>{getFilterTranslation(currentFilter)}</h2>
          </div>
          <CreateUnity>
            <Button
              variant='secondary'
              className='flex h-9 w-[130px] gap-1 sm:w-[140px]'
            >
              Додати
              <PlusIcon size={16} />
            </Button>
          </CreateUnity>
        </div>
        {renderContent()}
        {!isEndOfPages && (
          <Button onClick={() => loadMore(10)} variant='ghost'>
            Завантажити ще
          </Button>
        )}
      </div>
      <MobileMenu />
    </div>
  );
};

export default Dashboard;
