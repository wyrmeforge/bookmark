import { MediaStatus } from '@/shared/enums';
import { MediaItem } from '@/shared/api';

export interface IAppState {
  currentFilter: MediaStatus;
  list: MediaItem[] | null;
  searchValue: string;
}

export interface IAppStateContextProps extends IAppState {
  updateFilter: (filter: MediaStatus) => void;
  updateList: (list: MediaItem[] | null) => void;
  updateSearchValue: (value: string) => void;
}

export type AppStateAction =
  | { type: 'UPDATE_FILTER'; payload: MediaStatus }
  | { type: 'UPDATE_LIST'; payload: MediaItem[] | null }
  | { type: 'UPDATE_SEARCH_VALUE'; payload: string };
