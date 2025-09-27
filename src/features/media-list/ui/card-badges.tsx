import { Badge } from '@/shared/ui/badge';
import { Heart } from 'lucide-react';
import { MEDIA_STATUS_FILTERS } from '@/shared/config';
import { ListMedia } from '@/entities/media';
import { useAppState } from '@/shared/lib';
import { MediaStatus } from '@/shared/enums';
import { cn } from '@/shared/lib/utils';

export type CardBadgesProps = Pick<
  ListMedia,
  'episode' | 'isFavorite' | 'status' | 'totalEpisodes'
> & { isHovered: boolean };

const CardBadges = ({
  episode,
  isFavorite,
  status,
  isHovered,
  totalEpisodes,
}: CardBadgesProps) => {
  const { currentFilter } = useAppState();

  const isAllFilter = currentFilter === MediaStatus.All;

  const currentMediaStatusConfig = MEDIA_STATUS_FILTERS.find(
    ({ key }) => key === status
  );

  const MediaStatusIcon = currentMediaStatusConfig?.icon;

  const badges = [
    {
      isVisible: !!MediaStatusIcon && isAllFilter,
      value: MediaStatusIcon ? (
        <MediaStatusIcon className='h-4 w-4 md:h-5 md:w-5' />
      ) : null,
    },
    {
      isVisible: !!episode,
      value: (
        <div className='flex w-12 flex-col items-center text-xs'>
          <span>
            {episode}/{totalEpisodes}
          </span>
          <span>серій</span>
        </div>
      ),
    },
    {
      isVisible: isFavorite,
      value: (
        <Heart fill='white' stroke='red' className='h-4 w-4 md:h-5 md:w-5' />
      ),
    },
  ];

  return (
    <div className='flex items-center justify-center gap-1.5'>
      {badges.map(({ isVisible = true, value }, index) => {
        if (!isVisible) return null;

        return (
          <Badge
            key={index}
            className={cn(
              `
            h-full translate-y-[-6px] transform rounded-none rounded-bl-lg rounded-br-lg border border-muted-foreground
            px-0.5 opacity-0 transition-all duration-300
            ease-out hover:cursor-default group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100
          `,
              {
                'translate-y-0 opacity-100': !isAllFilter || isHovered,
              }
            )}
            style={{ transitionDelay: `${index * 75}ms` }}
          >
            {value}
          </Badge>
        );
      })}
    </div>
  );
};

export { CardBadges };
