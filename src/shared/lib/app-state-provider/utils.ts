import { AppStateAction, IAppState } from './types';
import { MediaStatus } from '@/shared/enums';

export const initialState: IAppState = {
  currentFilter: MediaStatus.All,
  list: null,
  isCreateSheetOpen: false,
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
    default:
      return state;
  }
};
