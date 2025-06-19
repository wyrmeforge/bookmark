import { MediaStatus } from '@/shared/enums/media';
import { ReactNode } from 'react';

type MenuItem = {
  key: string;
  title: string;
  icon: ReactNode;
  value: number;
};

export interface UseFiltersReturn {
  menu: MenuItem[];
  currentFilter: MediaStatus;
  updateFilter: (newFilter: MediaStatus) => void;
}
