import { MediaFilter } from '@/shared/enums/media';
import { CheckCheck, Eye, Goal, LoaderCircle } from 'lucide-react';
import { ReactNode } from 'react';

interface IStatusItem {
  icon: ReactNode;
  text: string;
}

export const useEntryStatus = (currentStatus: string): IStatusItem => {
  const statuses: Record<string, IStatusItem> = {
    [MediaFilter.Scheduled]: {
      icon: <Goal size={16} />,
      text: 'Буду дивитись',
    },
    [MediaFilter.Watching]: {
      icon: <Eye size={16} />,
      text: 'Дивлюсь',
    },
    [MediaFilter.Abandoned]: {
      icon: <LoaderCircle size={16} />,
      text: 'Закинуто',
    },
    [MediaFilter.Completed]: {
      icon: <CheckCheck size={16} />,
      text: 'Переглянуто',
    },
  };

  return statuses[currentStatus];
};
