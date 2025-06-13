import { Filters, LayoutViews } from '@/enums/unity';
import { IListItem } from '@/types/list';
import { ISortModel } from '@/types/unity';
import { ReactNode } from 'react';

export interface IAppState {
  currentFilter: Filters;
  list: IListItem[] | null;
  searchValue: string;
  sortModel: ISortModel;
  layoutView: LayoutViews;
}

export interface IAppStateContextProps extends IAppState {
  updateFilter: (filter: Filters) => void;
  updateSortModel: (sortModel: ISortModel) => void;
  updateList: (list: IListItem[] | null) => void;
  updateSearchValue: (value: string) => void;
  toggleLayoutView: () => void;
}

export interface IAppStateProviderProps {
  children: ReactNode;
}

export type AppStateAction =
  | { type: 'UPDATE_FILTER'; payload: Filters }
  | { type: 'UPDATE_SORT_MODEL'; payload: ISortModel }
  | { type: 'UPDATE_LIST'; payload: IListItem[] | null }
  | { type: 'UPDATE_SEARCH_VALUE'; payload: string }
  | { type: 'TOGGLE_LAYOUT_VIEW' };
