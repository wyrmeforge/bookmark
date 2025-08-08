import { ListMediaStatus } from '@/entities/media';
import { MediaStatus } from '@/shared/enums';
import {
  AlarmClockIcon,
  CalendarXIcon,
  CheckCheckIcon,
  EyeIcon,
  GoalIcon,
  HeartIcon,
  LucideProps,
  SwordIcon,
} from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

type MediaStatusFilterItem = {
  key: ListMediaStatus;
  label: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
  color: string;
};

export const MEDIA_STATUS_FILTERS: MediaStatusFilterItem[] = [
  {
    key: MediaStatus.Watching,
    label: 'Дивлюсь',
    icon: EyeIcon,
    color: 'bg-lime-700',
  },
  {
    key: MediaStatus.Scheduled,
    label: 'Заплановано',
    icon: GoalIcon,
    color: 'bg-blue-800',
  },
  {
    key: MediaStatus.Postponed,
    label: 'Відкладено',
    icon: AlarmClockIcon,
    color: 'bg-yellow-700',
  },
  {
    key: MediaStatus.Abandoned,
    label: 'Закинуто',
    icon: CalendarXIcon,
    color: 'bg-red-900',
  },
  {
    key: MediaStatus.Completed,
    label: 'Завершено',
    icon: CheckCheckIcon,
    color: 'bg-green-700',
  },
  {
    key: MediaStatus.Favorite,
    label: 'Улюблені',
    icon: HeartIcon,
    color: 'bg-pink-800',
  },
  {
    key: MediaStatus.All,
    label: 'Всі',
    icon: SwordIcon,
    color: 'bg-indigo-700',
  },
] as const;
