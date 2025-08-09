import { ListMedia } from '@/entities/media';
import { MediaStatus } from '@/shared/enums';

export interface IAppState {
  currentFilter: MediaStatus;
  list: ListMedia[] | null;
  searchValue: string;
}

export interface IAppStateContextProps extends IAppState {
  updateFilter: (filter: MediaStatus) => void;
  updateList: (list: ListMedia[] | null) => void;
  updateSearchValue: (value: string) => void;
}

export type AppStateAction =
  | { type: 'UPDATE_FILTER'; payload: MediaStatus }
  | { type: 'UPDATE_LIST'; payload: ListMedia[] | null }
  | { type: 'UPDATE_SEARCH_VALUE'; payload: string };
