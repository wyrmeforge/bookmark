import { AppStateAction, IAppState } from './types';
import { MediaStatus } from '@/shared/enums';

export const initialState: IAppState = {
  currentFilter: MediaStatus.Watching,
  list: null,
  searchValue: '',
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
    case 'UPDATE_SEARCH_VALUE':
      return { ...state, searchValue: action.payload };
    default:
      return state;
  }
};
