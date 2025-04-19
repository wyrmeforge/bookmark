import { Badge } from '@/components/ui/badge';
import { useEntryStatus } from '@/hooks/use-entry-status';
import { Heart } from 'lucide-react';

interface ICardBadgesProps {
  episode?: string;
  season?: string;
  isFavorite?: boolean;
  status: string;
}

const CardBadges = ({
  episode,
  season,
  isFavorite,
  status,
}: ICardBadgesProps) => {
  const { icon: statusIcon } = useEntryStatus(status);

  const badges = [
    {
      isVisible: !!episode && !!season,
      value: episode + ' / ' + season,
    },
    {
      value: statusIcon,
    },
    {
      isVisible: isFavorite,
      value: <Heart fill='white' stroke='red' size={16} />,
    },
  ];

  return (
    <div className='flex items-center justify-center gap-1'>
      {badges.map(({ isVisible = true, value }, key) => {
        if (!isVisible) return;

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

export default CardBadges;
