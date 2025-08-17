import { CardDescription, CardTitle } from '@/shared/ui/card';
import { ListMedia } from '../model';

type MediaMetaProps = {
  title: ListMedia['name'];
  rate: ListMedia['rate'];
  createdDate: string;
};

export const MediaMeta = ({ title, rate, createdDate }: MediaMetaProps) => (
  <div className='absolute bottom-0 left-0 right-0 z-20 flex h-10 flex-col justify-center gap-2 px-2 backdrop-blur-sm backdrop-brightness-[80%] md:h-[70px] md:px-5'>
    <CardTitle className='line-clamp-2 truncate whitespace-pre-wrap text-sm text-white'>
      {title}
    </CardTitle>
    <CardDescription className='hidden items-center justify-between text-sm text-white md:flex'>
      {createdDate}
      {rate && (
        <span className='font-medium'>
          {rate} <span className='text-white'>/ 10</span>
        </span>
      )}
    </CardDescription>
  </div>
);
