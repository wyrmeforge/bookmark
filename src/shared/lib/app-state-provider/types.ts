import { ListMedia } from '@/entities/media';
import { MediaStatus } from '@/shared/enums';

export interface IAppState {
  currentFilter: MediaStatus;
  list: ListMedia[] | null;
  isCreateSheetOpen: boolean;
}

export interface IAppStateContextProps extends IAppState {
  updateFilter: (filter: MediaStatus) => void;
  updateList: (list: ListMedia[] | null) => void;
  toggleCreateSheet: () => void;
}

export type AppStateAction =
  | { type: 'UPDATE_FILTER'; payload: MediaStatus }
  | { type: 'UPDATE_LIST'; payload: ListMedia[] | null }
  | { type: 'TOGGLE_CREATE_SHEET'; payload: boolean };
