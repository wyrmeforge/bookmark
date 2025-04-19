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

  const formattedDate = dayjs(_creationTime).format('DD.MM.YYYY');

  return (
    <Card className='relative w-full rounded-xl shadow transition-all hover:cursor-pointer hover:border-black hover:shadow-xl dark:hover:border-gray-50'>
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
          className='rounded-xl rounded-bl-none rounded-br-none'
          alt={name}
          src={imageUrl}
          width={400}
          height={400}
          style={{ objectFit: 'cover' }}
          sizes='(max-width: 768px) 100vw, 33vw'
        />
        <div className='flex h-full flex-col justify-between gap-2 px-5'>
          <CardTitle className='line-clamp-2 truncate whitespace-pre-wrap text-sm'>
            {name}
          </CardTitle>
          <CardDescription className='flex items-center justify-between text-sm text-muted-foreground'>
            {formattedDate}
            {!!rate && (
              <span className='font-medium text-primary'>
                {rate}
                <span className='text-muted-foreground'> / 10</span>
              </span>
            )}
          </CardDescription>
        </div>
      </CardContent>
    </Card>
  );
};

export default EntryCard;
