'use client';

import { createContext, PropsWithChildren, useReducer } from 'react';
import { IAppStateContextProps } from './types';
import { appStateReducer, initialState } from './utils';
import { MediaItem } from '@/shared/types/media';
import { MediaStatus } from '@/shared/enums/media';

export const AppStateContext = createContext<IAppStateContextProps>({
  updateFilter: () => {},
  updateList: () => {},
  updateSearchValue: () => {},
  ...initialState,
});

const AppStateProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(appStateReducer, initialState);

  const contextValue: IAppStateContextProps = {
    ...state,
    updateFilter: (filter: MediaStatus) =>
      dispatch({ type: 'UPDATE_FILTER', payload: filter }),
    updateList: (list: MediaItem[] | null) =>
      dispatch({ type: 'UPDATE_LIST', payload: list }),
    updateSearchValue: (value: string) =>
      dispatch({ type: 'UPDATE_SEARCH_VALUE', payload: value }),
  };

  return (
    <AppStateContext.Provider value={contextValue}>
      {children}
    </AppStateContext.Provider>
  );
};

export default AppStateProvider;
