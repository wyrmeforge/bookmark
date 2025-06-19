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

export const MEDIA_FILTERS = [
  {
    key: MediaStatus.All,
    label: 'Всі',
    icon: SwordIcon,
  },
  {
    key: MediaStatus.Scheduled,
    label: 'Заплановано',
    icon: GoalIcon,
  },
  {
    key: MediaStatus.Watching,
    label: 'Дивлюсь',
    icon: EyeIcon,
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
] as const;
