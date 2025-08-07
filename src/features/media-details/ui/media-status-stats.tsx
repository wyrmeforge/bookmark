import { MediaStats } from '@/entities/media';
import { MEDIA_STATUS_FILTERS } from '@/shared/config';
import { MediaStatus } from '@/shared/enums';

type MediaStatusStatsProps = Pick<MediaStats, 'users' | 'totalStatuses'>;

const statusMetaMap = Object.fromEntries(
  MEDIA_STATUS_FILTERS.map(({ key, label, icon }) => [key, { label, icon }])
);

const MediaStatusStats = ({ users, totalStatuses }: MediaStatusStatsProps) => {
  const statusesWithoutAllFilter = Object.entries(totalStatuses).filter(
    ([key]) => key !== MediaStatus.All
  );

  return (
    <section className='rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-lg'>
      <h4 className='mb-5 text-lg font-semibold tracking-tight text-primary'>
        Статистика
      </h4>

      <div className='mb-6 flex items-center justify-between rounded-md bg-muted/30 px-4 py-3'>
        <span className='text-sm text-muted-foreground'>
          Користувачів додало:
        </span>
        <span className='text-base font-bold text-foreground'>{users}</span>
      </div>

      <div className='space-y-1'>
        {statusesWithoutAllFilter.map(([key, value]) => {
          const meta = statusMetaMap[key as MediaStatus];
          const Icon = meta?.icon;
          const label = meta?.label;

          return (
            <div
              key={key}
              className='flex items-center justify-between gap-4 rounded-md px-3 py-2 hover:bg-muted/40'
            >
              <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                {Icon && <Icon className='h-4 w-4 text-muted-foreground' />}
                <span>{label}</span>
              </div>

              <span className='text-sm font-medium text-foreground'>
                {value}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export { MediaStatusStats };
