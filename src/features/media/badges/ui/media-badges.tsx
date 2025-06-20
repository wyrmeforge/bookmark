import { Badge } from '@/shared/ui/badge';
import { Heart } from 'lucide-react';
import { MediaItemBadgesProps } from '../model/types';
import { MEDIA_STATUS_FILTERS } from '@/shared/config/media/media-filters';

const MediaBadges = ({
  episode,
  season,
  isFavorite,
  status,
}: MediaItemBadgesProps) => {
  const currentMediaStatusConfig = MEDIA_STATUS_FILTERS.find(
    ({ key }) => key === status
  );

  const MediaStatusIcon = currentMediaStatusConfig?.icon;

  const badges = [
    {
      isVisible: !!episode && !!season,
      value: episode + ' / ' + season,
    },
    {
      isVisible: !!MediaStatusIcon,
      value: MediaStatusIcon ? (
        <MediaStatusIcon className='h-4 w-4 md:h-5 md:w-5' />
      ) : null,
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

export { MediaBadges };
