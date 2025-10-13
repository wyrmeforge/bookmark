import { AppStateAction, IAppState } from './types';
import { MediaStatus } from '@/shared/enums';

export const initialState: IAppState = {
  currentFilter: MediaStatus.All,
  list: null,
  isCreateSheetOpen: false,
  genreFilter: undefined,
  sortBy: 'date',
  sortOrder: 'desc',
};

export const appStateReducer = (
  state: IAppState,
  action: AppStateAction
): IAppState => {
  switch (action.type) {
    case 'UPDATE_FILTER':
      return { ...state, currentFilter: action.payload };
    case 'UPDATE_LIST':
      return { ...state, list: action.payload };
    case 'TOGGLE_CREATE_SHEET':
      return { ...state, isCreateSheetOpen: action.payload };
    case 'UPDATE_GENRE_FILTER':
      return { ...state, genreFilter: action.payload };
    case 'UPDATE_SORT':
      return {
        ...state,
        sortBy: action.payload.sortBy,
        sortOrder: action.payload.sortOrder,
      };

    default:
      return state;
  }
};
