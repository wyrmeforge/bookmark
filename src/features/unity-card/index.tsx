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
import UnityCardMenu from './_components/unity-card-menu';
import CardBadges from './_components/card-badges';
import { IListItem } from '@/types/list';

const EntryCard = ({ unityData }: { unityData: IListItem }) => {
  const {
    imageUrl,
    name,
    _creationTime,
    is_favorite,
    rate,
    season,
    episode,
    status,
  } = unityData;

  const formattedDate = dayjs(_creationTime).format('DD.MM.YYYY');

  const onClick = () => {
    // router.push(`/home/${unityData.unity_id}`);
  };

  return (
    <Card
      onClick={onClick}
      className='relative h-full min-h-[600px] w-full rounded-none border shadow transition-all hover:cursor-pointer hover:border-black hover:shadow-xl dark:border-neutral-800 dark:hover:border-white'
    >
      {/* Top badges and menu */}
      <CardHeader className='absolute top-3 z-10 w-full p-0'>
        <div className='flex w-full flex-row items-center justify-between px-5'>
          <CardBadges
            status={status}
            episode={episode}
            season={season}
            isFavorite={is_favorite}
          />
          <UnityCardMenu unityData={unityData} />
        </div>
      </CardHeader>

      {/* Image and overlay content */}
      <CardContent className='relative h-full p-0 pb-5'>
        <div className='relative h-full w-full'>
          <Image
            alt={name}
            src={imageUrl}
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            priority
            className='rounded-none object-cover'
          />
        </div>

        {/* Overlay text area */}
        <div className='absolute bottom-0 left-0 right-0 z-20 flex h-[70px] flex-col justify-center gap-2 px-5 backdrop-blur-sm backdrop-brightness-[80%]'>
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

export default EntryCard;
