import { ListMedia, Media } from '@/entities/media';
import { getTranslatedMediaUserStatus } from '@/shared/lib';
import { EditIcon } from 'lucide-react';

type UserActivityProps = Pick<
  ListMedia,
  'rate' | 'episode' | 'status' | 'viewedCount' | 'comment'
> &
  Pick<Media, 'episodes'>;

const UserActivity = ({
  rate,
  episode,
  status,
  viewedCount,
  comment,
  episodes,
}: UserActivityProps) => {
  const activityOptions = [
    {
      isVisible: rate,
      label: 'Оцінка',
      value: `${rate} / 10`,
    },
    {
      isVisible: episode,
      label: 'Переглянуто серій',
      value: `${episode} / ${episodes}`,
    },
    {
      isVisible: status,
      label: 'Статус',
      value: getTranslatedMediaUserStatus(status),
    },
    {
      isVisible: !!viewedCount && +viewedCount > 0,
      label: 'Переглянуто разів',
      value: viewedCount,
    },
    {
      isVisible: comment,
      label: 'Нотатка',
      value: comment,
    },
  ];

  return (
    <div className='rounded-xl border bg-card p-4 shadow-sm'>
      <div className='mb-3 flex items-center justify-between'>
        <h4 className='text-sm font-semibold text-muted-foreground'>
          Моя активність
        </h4>
        <EditIcon size={16} />
      </div>
      <div className='flex flex-col gap-3 text-sm text-muted-foreground'>
        {activityOptions?.map(({ isVisible, label, value }) => {
          if (!isVisible) return null;

          return (
            <div key={label} className='flex justify-between'>
              <span>{label}</span>
              <span className='font-medium text-foreground'>{value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { UserActivity };
