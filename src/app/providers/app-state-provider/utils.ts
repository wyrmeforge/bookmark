import { Filters, LayoutViews, SortDirection, SortName } from '@/enums/unity';
import { ISortModel } from '@/types/sort';
import { AppStateAction, IAppState } from './types';

const defaultSortModel: ISortModel = {
  label: 'Sort by Creation Time',
  value: SortName.CreationTime,
  direction: SortDirection.Desc,
};

export const initialState: IAppState = {
  currentFilter: Filters.All,
  list: null,
  searchValue: '',
  sortModel: defaultSortModel,
  layoutView: LayoutViews.Grid,
};

export const appStateReducer = (
  state: IAppState,
  action: AppStateAction
): IAppState => {
  switch (action.type) {
    case 'UPDATE_FILTER':
      return { ...state, currentFilter: action.payload };
    case 'UPDATE_SORT_MODEL':
      return { ...state, sortModel: action.payload };
    case 'UPDATE_LIST':
      return { ...state, list: action.payload };
    case 'UPDATE_SEARCH_VALUE':
      return { ...state, searchValue: action.payload };
    case 'TOGGLE_LAYOUT_VIEW':
      return {
        ...state,
        layoutView:
          state.layoutView === LayoutViews.Grid
            ? LayoutViews.Table
            : LayoutViews.Grid,
      };
    default:
      return state;
  }
};
