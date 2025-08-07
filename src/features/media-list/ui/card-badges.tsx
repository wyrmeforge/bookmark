import { Badge } from '@/shared/ui/badge';
import { Heart } from 'lucide-react';
import { MEDIA_STATUS_FILTERS } from '@/shared/config';
import { type MediaItem } from '@/entities/media';

export type CardBadgesProps = Pick<
  MediaItem,
  'episode' | 'season' | 'isFavorite' | 'status'
>;

const CardBadges = ({
  episode,
  season,
  isFavorite,
  status,
}: CardBadgesProps) => {
  const currentMediaStatusConfig = MEDIA_STATUS_FILTERS.find(
    ({ key }) => key === status
  );

  const MediaStatusIcon = currentMediaStatusConfig?.icon;

  const badges = [
    {
      isVisible: !!MediaStatusIcon,
      value: MediaStatusIcon ? (
        <MediaStatusIcon className='h-4 w-4 md:h-5 md:w-5' />
      ) : null,
    },
    {
      isVisible: !!episode && !!season,
      value: episode + ' / ' + season,
    },
    {
      isVisible: isFavorite,
      value: (
        <Heart fill='white' stroke='red' className='h-4 w-4 md:h-5 md:w-5' />
      ),
    },
  ];

  return (
    <div className='flex items-center justify-center gap-1 '>
      {badges.map(({ isVisible = true, value }, key) => {
        if (!isVisible) return null;

        return (
          <Badge
            key={key}
            className='border border-muted-foreground hover:cursor-default'
          >
            {value}
          </Badge>
        );
      })}
    </div>
  );
};

export { CardBadges };
