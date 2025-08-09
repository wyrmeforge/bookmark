import { ListMediaStatus } from '@/entities/media';
import { MediaStatus } from '@/shared/enums';
import { ReactNode } from 'react';

type MenuItem = {
  key: ListMediaStatus;
  title: string;
  icon: ReactNode;
  value: number;
  color: {
    bg: string;
    border: string;
    text: string;
  };
};

export interface UseFiltersReturn {
  menu: MenuItem[];
  currentFilter: MediaStatus;
  updateFilter: (newFilter: MediaStatus) => void;
}
