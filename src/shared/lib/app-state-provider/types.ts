import { ListMedia } from '@/entities/media';
import { MediaStatus } from '@/shared/enums';

export interface IAppState {
  currentFilter: MediaStatus;
  list: ListMedia[] | null;
  isCreateSheetOpen: boolean;

  // нові поля
  genreFilter: string | undefined;
  sortBy: 'date' | 'year';
  sortOrder: 'asc' | 'desc';
}

export interface IAppStateContextProps extends IAppState {
  updateFilter: (filter: MediaStatus) => void;
  updateList: (list: ListMedia[] | null) => void;
  toggleCreateSheet: () => void;

  // нові методи
  updateGenreFilter: (genre: string | undefined) => void;
  updateSort: (sortBy: 'date' | 'year', sortOrder: 'asc' | 'desc') => void;
}

export type AppStateAction =
  | { type: 'UPDATE_FILTER'; payload: MediaStatus }
  | { type: 'UPDATE_LIST'; payload: ListMedia[] | null }
  | { type: 'TOGGLE_CREATE_SHEET'; payload: boolean }
  | { type: 'UPDATE_GENRE_FILTER'; payload: string | undefined }
  | {
      type: 'UPDATE_SORT';
      payload: { sortBy: 'date' | 'year'; sortOrder: 'asc' | 'desc' };
    };
