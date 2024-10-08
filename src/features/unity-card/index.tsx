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

const UnityCard = ({
  imageUrl,
  name,
  _creationTime,
  is_favorite,
  rate,
  _id,
  season,
  episode,
}: IListItem) => (
  <div className='sm:width-40 relative rounded-xl  transition-all hover:border-black hover:shadow-xl dark:hover:border-gray-50'>
    <UnityCardMenu isFavorite={is_favorite} name={name} id={_id} />
    <Card className='w-full shadow hover:border-black hover:shadow-xl dark:hover:border-gray-50'>
      <CardHeader className='relative  hidden h-[200px] p-0 sm:block sm:h-[400px]'>
        <Image
          className='h-full w-full rounded-xl rounded-bl-none rounded-br-none object-cover sm:block'
          alt='anime'
          src={imageUrl}
          width={100}
          height={400}
        />
        <CardBadges
          episode={episode}
          season={season}
          isFavorite={is_favorite}
        />
      </CardHeader>
      <CardContent className='flex flex-col gap-4 p-4'>
        <CardTitle className='line-clamp-2 flex h-10 justify-between truncate whitespace-pre-wrap text-sm'>
          {name}
        </CardTitle>
        <CardDescription className='flex items-center justify-between'>
          {dayjs(_creationTime).format('DD.MM.YYYY')}
          {!!rate && (
            <p>
              {rate} / <span className='text-white'>10</span>
            </p>
          )}
        </CardDescription>
      </CardContent>
    </Card>
  </div>
);

export default UnityCard;
