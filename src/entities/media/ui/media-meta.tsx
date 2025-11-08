import { CardDescription, CardTitle } from '@/shared/ui/card';
import { ListMedia } from '../model';

type MediaMetaProps = {
  title: ListMedia['name'];
  rate: ListMedia['rate'];
  createdDate: string;
  episode?: number;
  totalEpisodes?: number;
};

export const MediaMeta = ({ title, rate, createdDate }: MediaMetaProps) => {
  return (
    <div className='absolute bottom-0 left-0 right-0 z-20 flex h-auto flex-col justify-center gap-1 bg-gradient-to-t from-black/80 via-black/40 to-transparent py-2 backdrop-blur-sm backdrop-brightness-[90%] md:min-h-[70px]'>
      <div className='flex flex-col gap-2 px-2  md:px-5'>
        <CardTitle className='line-clamp-2 truncate whitespace-pre-wrap text-sm text-white'>
          {title}
        </CardTitle>
        <CardDescription className='hidden items-center justify-between text-sm text-white md:flex'>
          {createdDate}
          {rate && (
            <span className='text-md font-medium'>
              {rate} <span className='font-bold '>/ 10</span>
            </span>
          )}
        </CardDescription>
      </div>
    </div>
  );
};
