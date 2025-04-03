import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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

  return (
    <Card className='relative w-full rounded-xl shadow hover:border-black hover:shadow-xl dark:hover:border-gray-50'>
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
      <CardContent className='flex h-full flex-col gap-4 p-0 pb-5'>
        <Image
          className='min-w-100 min-h-100 rounded-xl rounded-bl-none rounded-br-none sm:block'
          alt='Entry Cover Image'
          src={imageUrl}
          width={400}
          height={400}
        />
        <div className='flex h-full flex-col justify-between gap-2 px-5'>
          <CardTitle className='line-clamp-2 truncate whitespace-pre-wrap text-sm'>
            {name}
          </CardTitle>
          <CardDescription className='flex items-center justify-between'>
            {dayjs(_creationTime).format('DD.MM.YYYY')}
            {!!rate && (
              <span>
                {rate} / <span className='text-white'>10</span>
              </span>
            )}
          </CardDescription>
        </div>
      </CardContent>
    </Card>
  );
};

export default EntryCard;
