'use client';

import { useMediaList } from '../../model/use-media-list';
import { Loader } from '@/shared/ui/loader';
import { Button } from '@/shared/ui/button';
import { EmptyMediaList } from './empty-media-list';
import { MediaItemContainer } from '@/entities/media';
import { MediaItemStatus } from '@/shared/types/media';

export const MediaContent = () => {
  const { list, isListLoading, loadMore, currentFilter, isEndOfPages } =
    useMediaList();

  if (isListLoading) return <Loader variant='absolute' />;

  if (!list?.length)
    return <EmptyMediaList currentFilter={currentFilter as MediaItemStatus} />;

  return (
    <>
      <div className='grid grid-cols-container gap-8 overflow-auto pb-4 md:pr-2'>
        {list.map((item) => (
          <MediaItemContainer key={item._id} unityData={item} />
        ))}
      </div>
      {!isEndOfPages && (
        <div className='my-4 flex justify-center'>
          <Button
            onClick={() => loadMore(20)}
            variant='secondary'
            className='w-full max-w-48'
          >
            Завантажити ще
          </Button>
        </div>
      )}
    </>
  );
};
