"use client";

import {
  createContext,
  type PropsWithChildren,
  useContext,
  useReducer,
} from "react";
import type { ListMedia } from "@/entities/media";
import type { MediaStatus } from "@/shared/enums";
import type { IAppStateContextProps } from "./types";
import { appStateReducer, initialState } from "./utils";

const AppStateContext = createContext<IAppStateContextProps>({
  updateFilter: () => {},
  updateList: () => {},
  updateGenreFilter: () => {},
  toggleCreateSheet: () => {},
  updateSort: () => {},
  ...initialState,
});

const AppStateProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(appStateReducer, initialState);

  const contextValue: IAppStateContextProps = {
    ...state,
    updateFilter: (filter: MediaStatus) =>
      dispatch({ type: "UPDATE_FILTER", payload: filter }),
    updateList: (list: ListMedia[] | null) =>
      dispatch({ type: "UPDATE_LIST", payload: list }),
    updateGenreFilter: (genre: string | undefined) =>
      dispatch({ type: "UPDATE_GENRE_FILTER", payload: genre }),
    updateSort: (sortBy: "date" | "year", sortOrder: "asc" | "desc") =>
      dispatch({ type: "UPDATE_SORT", payload: { sortBy, sortOrder } }),

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

export const useAppState = () => useContext(AppStateContext);
