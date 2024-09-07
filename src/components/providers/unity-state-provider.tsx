'use client';

import { Filters } from '@/enums/filters';
import { Module } from '@/enums/modules';
import { SortDirection, SortName } from '@/enums/sort';
import { ISortModel } from '@/types/sort';
import { createContext, FC, ReactNode, useState } from 'react';

interface IUnityStateContext {
  currentFilter: Filters;
  setCurrentFilter: (newFilter: Filters) => void;
  currentModule: Module;
  setCurrentModule: (newModule: Module) => void;
  sortModel: ISortModel;
  setSortModel: (newModel: ISortModel) => void;
}

interface IUnityStateProviderProps {
  children: ReactNode;
}

const defaultContext: IUnityStateContext = {
  currentFilter: Filters.All,
  setCurrentFilter: () => {},
  currentModule: Module.Anime,
  setCurrentModule: () => {},
  sortModel: {
    label: 'За датою додавання',
    value: SortName.CreationTime,
    direction: SortDirection.Desc,
  },
  setSortModel: () => {},
};

export const UnityStateContext =
  createContext<IUnityStateContext>(defaultContext);

const UnityStateProvider: FC<IUnityStateProviderProps> = ({ children }) => {
  const [currentFilter, setCurrentFilter] = useState(Filters.All);
  const [currentModule, setCurrentModule] = useState(Module.Anime);
  const [sortModel, setSortModel] = useState({
    label: 'За датою додавання',
    value: SortName.CreationTime,
    direction: SortDirection.Desc,
  });

  const contextValue = {
    currentFilter,
    setCurrentFilter,
    currentModule,
    setCurrentModule,
    sortModel,
    setSortModel,
  };

  return (
    <UnityStateContext.Provider value={contextValue}>
      {children}
    </UnityStateContext.Provider>
  );
};

export default UnityStateProvider;
