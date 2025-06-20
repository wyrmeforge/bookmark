import { MediaStatus } from '@/shared/enums/media';
import {
  AlarmClockIcon,
  CalendarXIcon,
  CheckCheckIcon,
  EyeIcon,
  GoalIcon,
  HeartIcon,
  SwordIcon,
} from 'lucide-react';

export const MEDIA_STATUS_FILTERS = [
  {
    key: MediaStatus.Watching,
    label: 'Дивлюсь',
    icon: EyeIcon,
  },
  {
    key: MediaStatus.Scheduled,
    label: 'Заплановано',
    icon: GoalIcon,
  },
  {
    key: MediaStatus.Postponed,
    label: 'Відкладено',
    icon: AlarmClockIcon,
  },
  {
    key: MediaStatus.Abandoned,
    label: 'Закинуто',
    icon: CalendarXIcon,
  },
  {
    key: MediaStatus.Completed,
    label: 'Завершено',
    icon: CheckCheckIcon,
  },
  {
    key: MediaStatus.Favorite,
    label: 'Улюблені',
    icon: HeartIcon,
  },
  {
    key: MediaStatus.All,
    label: 'Всі',
    icon: SwordIcon,
  },
] as const;
