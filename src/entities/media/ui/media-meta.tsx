import { CardDescription, CardTitle } from '@/shared/ui/card';

type MediaMetaProps = {
  title: string;
  rate?: string;
  createdDate: string;
};

export const MediaMeta = ({ title, rate, createdDate }: MediaMetaProps) => (
  <div className='absolute bottom-0 left-0 right-0 z-20 flex h-[70px] flex-col justify-center gap-2 px-2 backdrop-blur-sm backdrop-brightness-[80%] md:px-5'>
    <CardTitle className='line-clamp-2 truncate whitespace-pre-wrap text-sm text-white'>
      {title}
    </CardTitle>
    <CardDescription className='flex items-center justify-between text-sm text-white'>
      {createdDate}
      {rate && (
        <span className='font-medium'>
          {rate} <span className='text-white'>/ 10</span>
        </span>
      )}
    </CardDescription>
  </div>
);
