import { Badge } from '@/components/ui/badge';
import { Filters } from '@/enums/unity';
import { CheckCheck, Eye, Goal, Heart, LoaderCircle } from 'lucide-react';
import { ReactNode } from 'react';

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
  const statuses: Partial<Record<string, ReactNode>> = {
    [Filters.InFuture]: <Goal size={16} />,
    [Filters.InProgress]: <Eye size={16} />,
    [Filters.Abandoned]: <LoaderCircle size={16} />,
    [Filters.Completed]: <CheckCheck size={16} />,
  };

  return (
    <div className='flex h-5 items-center justify-center gap-1'>
      {episode && season && (
        <Badge className='border border-muted-foreground hover:cursor-default'>
          {episode} / {season}
        </Badge>
      )}
      <Badge className='border border-muted-foreground hover:cursor-default'>
        {statuses[status]}
      </Badge>
      {isFavorite && (
        <Badge className='border border-muted-foreground hover:cursor-default'>
          <Heart fill='white' stroke='red' size={16} />
        </Badge>
      )}
    </div>
  );
};

export default CardBadges;
