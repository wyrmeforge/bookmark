import { MediaStats } from '@/entities/media';

type MediaRateStatsProps = Pick<MediaStats, 'totalRate' | 'users'>;

const formatRateKey = (key: string) => key.replace('_', '');

const MediaRateStats = ({ totalRate, users }: MediaRateStatsProps) => {
  const rates = Object.entries(totalRate).sort(
    (a, b) => Number(formatRateKey(a[0])) - Number(formatRateKey(b[0]))
  );

  return (
    <section className='rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-lg'>
      <h5 className='mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground'>
        Оцінки
      </h5>

      <div className='space-y-2'>
        {rates.map(([key, count]) => {
          const score = formatRateKey(key);
          const percentage = users ? Math.round((count / users) * 100) : 0;

          return (
            <div
              key={key}
              className='group flex items-center gap-3 rounded-md px-2 py-1 transition-colors hover:bg-muted/40'
            >
              <span className='w-6 font-mono text-xs text-muted-foreground'>
                {score}
              </span>
              <div className='relative h-3 flex-1 overflow-hidden rounded-full bg-muted'>
                <div
                  className='absolute left-0 top-0 h-3 rounded-full bg-primary transition-all duration-300'
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className='w-10 text-right text-xs font-semibold text-foreground'>
                {count}
              </span>
              <span className='w-8 text-right font-mono text-xs text-muted-foreground'>
                {percentage}%
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export { MediaRateStats };
