import { CardDescription, CardTitle } from '@/shared/ui/card';
import { ListMedia } from '../model';
import { useAppState } from '@/shared/lib';
import { MediaStatus } from '@/shared/enums';
import { cn } from '@/shared/lib/utils';

type MediaMetaProps = {
  title: ListMedia['name'];
  rate: ListMedia['rate'];
  createdDate: string;
  episode?: number;
  totalEpisodes?: number;
};

export const MediaMeta = ({
  title,
  rate,
  createdDate,
  episode = 0,
  totalEpisodes = 0,
}: MediaMetaProps) => {
  const { currentFilter } = useAppState();

  const withProgressStatus = [
    MediaStatus.Abandoned,
    MediaStatus.Postponed,
    MediaStatus.Watching,
  ].includes(currentFilter);

  const watched = Number(episode) || 0;
  const total = Number(totalEpisodes) || 0;
  const progress = total > 0 ? Math.min(Math.max(watched / total, 0), 1) : 0;

  const isProgressVisible = withProgressStatus && progress > 0;

  const progressColor =
    progress <= 0.3
      ? 'bg-red-500'
      : progress <= 0.7
        ? 'bg-cyan-500'
        : 'bg-green-500';

  return (
    <div className='absolute bottom-0 left-0 right-0 z-20 flex flex-col justify-center gap-1 backdrop-blur-sm backdrop-brightness-[80%] md:h-[70px]'>
      {isProgressVisible && (
        <div className='absolute top-0 h-1 w-full rounded bg-gray-300 dark:bg-neutral-700'>
          <div
            className={cn(
              'h-full rounded transition-all duration-300 ease-out',
              progressColor
            )}
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      )}
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
