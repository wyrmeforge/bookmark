import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useMutation } from 'convex/react';
import dayjs from 'dayjs';
import { Heart, MenuIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { api } from '../../../../../convex/_generated/api';
import { Id } from '../../../../../convex/_generated/dataModel';
import { Separator } from '@/components/ui/separator';
import { ContextMenu, ContextMenuTrigger } from '@/components/ui/context-menu';
import { CardMenu } from './card-menu';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import CardInfo from './card-info';

interface IUnityCardProps {
  imageUrl: string;
  name: string;
  date: number;
  isFavorite?: boolean;
  rate?: number;
  id: Id<'lists'>;
}

const UnityCard = ({
  imageUrl,
  name,
  date,
  isFavorite,
  rate,
  id,
  season,
  episode,
}: IUnityCardProps) => {
  return (
    <div className='relative'>
      <DropdownMenu>
        <DropdownMenuTrigger className='absolute right-3 top-[15px] z-20'>
          <Badge className='border border-muted-foreground'>
            <MenuIcon size={16} />
          </Badge>
        </DropdownMenuTrigger>
        <CardMenu isFavorite={isFavorite} name={name} id={id} />
        <Sheet>
          <SheetTrigger>
            <Card className='sm:width-40 rounded-xl shadow transition-all hover:border-black hover:shadow-xl dark:hover:border-gray-50'>
              <CardHeader className='relative flex h-[200px] p-0 sm:h-[400px]'>
                <Image
                  sizes={'20'}
                  className='h-full w-full rounded-xl rounded-bl-none rounded-br-none object-cover'
                  alt='anime'
                  src={imageUrl}
                  width={100}
                  height={400}
                />
                {episode && season && (
                  <TooltipProvider>
                    <Tooltip delayDuration={200}>
                      <TooltipTrigger className='absolute left-2 top-2'>
                        <Badge className=' border border-muted-foreground bg-black text-white hover:cursor-default hover:bg-black'>
                          {episode} / {season}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Серія / Сезон</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
                {isFavorite && (
                  <Badge className='absolute left-2 top-2  border border-muted-foreground hover:cursor-default'>
                    <Heart fill='white' stroke='red' size={16} />
                  </Badge>
                )}
              </CardHeader>
              <CardContent className='flex flex-col gap-4 p-4'>
                <CardTitle className='line-clamp-2 flex h-10 justify-between truncate whitespace-pre-wrap text-sm'>
                  {name}
                </CardTitle>
                <CardDescription className='flex items-center justify-between'>
                  {dayjs(date).format('DD.MM.YYYY')}
                  <TooltipProvider>
                    <Tooltip delayDuration={200}>
                      {!!rate && (
                        <>
                          <TooltipTrigger className='text-end text-muted-foreground'>
                            {rate} / <span className='text-white'>10</span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Оцінка</p>
                          </TooltipContent>
                        </>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                </CardDescription>
              </CardContent>
            </Card>
          </SheetTrigger>
          <CardInfo />
        </Sheet>
      </DropdownMenu>
    </div>
  );
};

export default UnityCard;
