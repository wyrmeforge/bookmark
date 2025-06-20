import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import dayjs from 'dayjs';
import Image from 'next/image';
import React from 'react';
import { MediaMenu } from '@/features/media/menu';
import { MediaBadges } from '@/features/media/badges';
import { type MediaItem } from '@/shared/types/media';

const MediaItemContainer = ({ unityData }: { unityData: MediaItem }) => {
  const {
    imageUrl,
    name,
    _creationTime,
    isFavorite,
    rate,
    season,
    episode,
    status,
  } = unityData;

  const formattedDate = dayjs(_creationTime).format('DD.MM.YYYY');

  return (
    <Card className='relative h-full min-h-[300px] w-full rounded-none border shadow transition-all hover:cursor-pointer hover:border-black hover:shadow-xl dark:border-neutral-800 dark:hover:border-white md:min-h-[450px]'>
      <CardHeader className='absolute top-3 z-10 w-full p-0'>
        <div className='flex w-full flex-row items-center justify-between px-2 md:px-5'>
          <MediaBadges
            status={status}
            episode={episode}
            season={season}
            isFavorite={isFavorite}
          />
          <MediaMenu mediaItem={unityData} />
        </div>
      </CardHeader>
      <CardContent className='relative h-full p-0 '>
        <div className='relative h-full w-full'>
          <Image
            alt={name}
            src={imageUrl}
            priority
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            className='rounded-none object-cover'
          />
        </div>
        <div className='absolute bottom-0 left-0 right-0 z-20 flex h-[70px] flex-col justify-center gap-2 px-2 backdrop-blur-sm backdrop-brightness-[80%] md:px-5'>
          <CardTitle className='line-clamp-2 truncate whitespace-pre-wrap text-sm text-white'>
            {name}
          </CardTitle>
          <CardDescription className='flex items-center justify-between text-sm text-white'>
            {formattedDate}
            {rate && (
              <span className='font-medium'>
                {rate} <span className='text-white'>/ 10</span>
              </span>
            )}
          </CardDescription>
        </div>
      </CardContent>
    </Card>
  );
};

export { MediaItemContainer };
