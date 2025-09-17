import { Card, CardContent, CardHeader } from '@/shared/ui/card';
import { useRouter } from 'next/navigation';
import { ListMedia, MediaMeta, MediaPoster } from '@/entities/media';
import { formatDate } from '@/shared/lib';
import { CardMenu } from './card-menu';
import { CardBadges } from './card-badges';

export type MediaCardProps = {
  mediaData: ListMedia;
  itemIdx: number;
};

const MediaCard = ({ mediaData, itemIdx }: MediaCardProps) => {
  const router = useRouter();

  const {
    imageUrl,
    name,
    _creationTime,
    isFavorite,
    rate,
    episode,
    status,
    mediaId,
  } = mediaData;

  const handleClick = () => {
    router.push(`/home/${mediaId}`);
  };

  const formattedDate = formatDate(_creationTime);

  return (
    <Card
      onClick={handleClick}
      className='group relative h-full min-h-[300px] w-full rounded-none border shadow transition-all hover:cursor-pointer hover:border-black hover:shadow-xl dark:border-neutral-800 dark:hover:border-white md:min-h-[600px]'
    >
      <CardHeader className='absolute -top-[1px] z-10 w-full p-0'>
        <div className='flex w-full flex-row justify-between pl-2'>
          <CardBadges
            status={status}
            episode={episode}
            isFavorite={isFavorite}
          />
          <CardMenu mediaItem={mediaData} />
        </div>
      </CardHeader>
      <CardContent className='relative h-full p-0 '>
        <MediaPoster alt={name} src={imageUrl} priority={itemIdx < 3} />
        <MediaMeta title={name} rate={rate} createdDate={formattedDate} />
      </CardContent>
    </Card>
  );
};

export { MediaCard };
