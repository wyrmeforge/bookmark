"use client";

import {
  createContext,
  type PropsWithChildren,
  useContext,
  useReducer,
} from "react";
import type {
  IListItem,
  TMediaStatus,
} from "@/entities/media/model/convex/constants";
import type { IAppStateContextProps } from "./types";
import { appStateReducer, initialState } from "./utils";

const AppStateContext = createContext<IAppStateContextProps | undefined>(
  undefined
);

const AppStateProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(appStateReducer, initialState);

  const contextValue: IAppStateContextProps = {
    ...state,
    updateFilter: (filter: TMediaStatus) =>
      dispatch({ type: "UPDATE_FILTER", payload: filter }),
    updateList: (list: IListItem[] | null) =>
      dispatch({ type: "UPDATE_LIST", payload: list }),
    toggleCreateSheet: () =>
      dispatch({
        type: "TOGGLE_CREATE_SHEET",
        payload: !state.isCreateSheetOpen,
      }),
  };

  return (
    <AppStateContext.Provider value={contextValue}>
      {children}
    </AppStateContext.Provider>
  );
};

export { AppStateProvider };

export const useAppState = () => {
  const ctx = useContext(AppStateContext);
  if (!ctx) {
    throw new Error("useAppState must be used within AppStateProvider");
  }
  return ctx;
};
