import { Card, CardContent, CardHeader } from '@/shared/ui/card';
import { ListMedia, MediaMeta, MediaPoster } from '@/entities/media';
import { formatDate } from '@/shared/lib';
import { CardMenu } from './card-menu';
import { CardBadges } from './card-badges';
import { useState } from 'react';
import { cn } from '@/shared/lib/utils';

type MediaCardProps = {
  mediaData: ListMedia;
  itemIdx: number;
};

const MediaCard = ({ mediaData, itemIdx }: MediaCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const {
    image,
    name,
    _creationTime,
    isFavorite,
    rate,
    episodesCount,
    status,
  } = mediaData;

  const formattedDate = formatDate(_creationTime);

  return (
    <Card
      className={cn(
        'group relative z-10 h-full min-h-[300px] w-full rounded-none border shadow transition-all    dark:border-neutral-800  md:min-h-[600px]',
        {
          'dark:border-white': isHovered,
        }
      )}
    >
      <CardHeader className='absolute -top-[2px] z-10 w-full p-0'>
        <div className='flex w-full flex-row justify-between pl-2'>
          <CardBadges
            isHovered={isHovered}
            status={status}
            episode={episodesCount}
            isFavorite={isFavorite}
            totalEpisodes={0}
          />
          <CardMenu
            isHovered={isHovered}
            handleOpen={(isOpen: boolean) => setIsHovered(isOpen)}
            mediaItem={mediaData}
          />
        </div>
      </CardHeader>
      <CardContent className='relative h-full p-0 '>
        <MediaPoster alt={name} src={image} priority={itemIdx < 3} />
        <MediaMeta
          totalEpisodes={0}
          episode={episodesCount}
          title={name}
          rate={rate}
          createdDate={formattedDate}
        />
      </CardContent>
    </Card>
  );
};

export { MediaCard };
