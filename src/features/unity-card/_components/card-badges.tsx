import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Heart } from 'lucide-react';
import React from 'react';

interface ICardBadgesProps {
  episode?: string;
  season?: string;
  isFavorite?: boolean;
}

const CardBadges = ({ episode, season, isFavorite }: ICardBadgesProps) => {
  return (
    <>
      {episode && season && (
        <Tooltip delayDuration={200}>
          <TooltipTrigger className='sm:absolute sm:left-2 sm:top-2'>
            <Badge className=' border border-muted-foreground bg-black text-white hover:cursor-default hover:bg-black'>
              {episode} / {season}
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>Серія / Сезон</p>
          </TooltipContent>
        </Tooltip>
      )}
      {isFavorite && (
        <Badge className='left-2 top-2 border  border-muted-foreground hover:cursor-default sm:absolute'>
          <Heart fill='white' stroke='red' size={16} />
        </Badge>
      )}
    </>
  );
};

export default CardBadges;
