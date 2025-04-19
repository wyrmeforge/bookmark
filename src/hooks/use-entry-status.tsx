import { EntryStatus } from '@/enums/unity';
import { CheckCheck, Eye, Goal, LoaderCircle } from 'lucide-react';
import { ReactNode } from 'react';

interface IStatusItem {
  icon: ReactNode;
  text: string;
}

export const useEntryStatus = (currentStatus: string): IStatusItem => {
  const statuses: Record<string, IStatusItem> = {
    [EntryStatus.InFuture]: {
      icon: <Goal size={16} />,
      text: 'Буду дивитись',
    },
    [EntryStatus.InProgress]: {
      icon: <Eye size={16} />,
      text: 'Дивлюсь',
    },
    [EntryStatus.Abandoned]: {
      icon: <LoaderCircle size={16} />,
      text: 'Закинуто',
    },
    [EntryStatus.Completed]: {
      icon: <CheckCheck size={16} />,
      text: 'Переглянуто',
    },
  };

  return statuses[currentStatus];
};
