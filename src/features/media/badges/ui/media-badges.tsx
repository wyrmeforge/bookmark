import { Badge } from '@/shared/ui/badge';
import { Heart } from 'lucide-react';
import { MEDIA_FILTERS } from '@/shared/config/media/media-filters';
import { MediaItemBadgesProps } from '../model/types';

const MediaBadges = ({
  episode,
  season,
  isFavorite,
  status,
}: MediaItemBadgesProps) => {
  const currentMediaStatusConfig = MEDIA_FILTERS.find(
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
      value: MediaStatusIcon ? <MediaStatusIcon size={20} /> : null,
    },
    {
      isVisible: isFavorite,
      value: <Heart fill='white' stroke='red' size={20} />,
    },
  ];

  return (
    <div className='flex items-center justify-center gap-1'>
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
