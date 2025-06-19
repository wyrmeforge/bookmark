import { LayoutViews } from '@/enums/unity';
import { MediaStatus } from '@/shared/enums/media';
import { MediaItem } from '@/shared/types/media';

export interface IAppState {
  currentFilter: MediaStatus;
  list: MediaItem[] | null;
  searchValue: string;
  // sortModel: ISortModel;
  layoutView: LayoutViews;
}

export interface IAppStateContextProps extends IAppState {
  updateFilter: (filter: MediaStatus) => void;
  // updateSortModel: (sortModel: ISortModel) => void;
  updateList: (list: MediaItem[] | null) => void;
  updateSearchValue: (value: string) => void;
  toggleLayoutView: () => void;
}

export type AppStateAction =
  | { type: 'UPDATE_FILTER'; payload: MediaStatus }
  // | { type: 'UPDATE_SORT_MODEL'; payload: ISortModel }
  | { type: 'UPDATE_LIST'; payload: MediaItem[] | null }
  | { type: 'UPDATE_SEARCH_VALUE'; payload: string }
  | { type: 'TOGGLE_LAYOUT_VIEW' };
