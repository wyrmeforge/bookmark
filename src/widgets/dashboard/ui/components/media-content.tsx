'use client';

import { useMediaList } from '../../model/use-media-list';
import { Loader } from '@/shared/ui/loader';
import { Button } from '@/shared/ui/button';
import { EmptyMediaList } from './empty-media-list';
import { MediaItemContainer } from '@/entities/media';
import { MediaItemStatus } from '@/shared/types/media';

export const MediaContent = () => {
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
    return <EmptyMediaList currentFilter={currentFilter as MediaItemStatus} />;

  return (
    <div className='grid grid-cols-2 justify-center gap-4 pb-4 md:grid-cols-container md:pr-2'>
      {list.map((item) => (
        <MediaItemContainer key={item._id} unityData={item} />
      ))}

      {!isEndOfPages && (
        <div className='my-4 flex w-full justify-center'>
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
