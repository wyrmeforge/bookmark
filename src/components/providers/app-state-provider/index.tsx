'use client';

import { createContext, useReducer } from 'react';
import { Filters } from '@/enums/filters';
import { IListItem } from '@/types/list';
import { ISortModel } from '@/types/sort';
import { IAppStateContextProps, IAppStateProviderProps } from './types';
import { appStateReducer, initialState } from './utils';

export const AppStateContext = createContext<IAppStateContextProps>({
  toggleFilterPanel: () => {},
  updateFilter: () => {},
  updateSortModel: () => {},
  updateList: () => {},
  updateSearchValue: () => {},
  toggleLayoutView: () => {},
  ...initialState,
});

const AppStateProvider = ({ children }: IAppStateProviderProps) => {
  const [state, dispatch] = useReducer(appStateReducer, initialState);

  const contextValue: IAppStateContextProps = {
    ...state,
    toggleFilterPanel: () => dispatch({ type: 'TOGGLE_FILTER_PANEL' }),
    updateFilter: (filter: Filters) =>
      dispatch({ type: 'UPDATE_FILTER', payload: filter }),
    updateSortModel: (sortModel: ISortModel) =>
      dispatch({ type: 'UPDATE_SORT_MODEL', payload: sortModel }),
    updateList: (list: IListItem[] | null) =>
      dispatch({ type: 'UPDATE_LIST', payload: list }),
    updateSearchValue: (value: string) =>
      dispatch({ type: 'UPDATE_SEARCH_VALUE', payload: value }),
    toggleLayoutView: () => dispatch({ type: 'TOGGLE_LAYOUT_VIEW' }),
  };

  return (
    <AppStateContext.Provider value={contextValue}>
      {children}
    </AppStateContext.Provider>
  );
};

export default AppStateProvider;
