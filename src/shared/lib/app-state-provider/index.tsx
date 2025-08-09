'use client';

import {
  createContext,
  PropsWithChildren,
  useContext,
  useReducer,
} from 'react';

import { IAppStateContextProps } from './types';
import { appStateReducer, initialState } from './utils';
import { MediaStatus } from '@/shared/enums';
import { ListMedia } from '@/entities/media';

const AppStateContext = createContext<IAppStateContextProps>({
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
    updateList: (list: ListMedia[] | null) =>
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

export { AppStateProvider };

export const useAppState = () => useContext(AppStateContext);
