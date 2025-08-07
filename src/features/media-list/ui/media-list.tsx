'use client';

import { Loader } from '@/shared/ui/loader';
import { Button } from '@/shared/ui/button';
import { useMediaList } from '../model';
import { EmptyListPlaceholder } from './components/empty-list-placeholder';
import { MediaCard } from './media-card';
import { MediaItemStatus } from '@/entities/media';

const MediaList = () => {
  const {
    list,
    isFirstLoading,
    isLoadingMore,
    loadMore,
    currentFilter,
    isEndOfPages,
  } = useMediaList();

  if (isFirstLoading) return <Loader variant='absolute' />;

  if (!list?.length)
    return (
      <EmptyListPlaceholder currentFilter={currentFilter as MediaItemStatus} />
    );

  return (
    <div className='flex flex-col justify-center gap-4 pb-4 md:grid md:grid-cols-container md:pr-2'>
      {list.map((item, idx) => (
        <MediaCard itemIdx={idx} key={item._id} mediaData={item} />
      ))}
      {!isEndOfPages && (
        <div className='col-span-2 flex w-full items-center justify-center border-none md:col-auto md:border-2 md:border-dashed'>
          {isLoadingMore ? (
            <Loader variant='small' />
          ) : (
            <Button
              onClick={() => loadMore(20)}
              variant='secondary'
              className='w-full max-w-48'
            >
              Завантажити ще
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export { MediaList };
