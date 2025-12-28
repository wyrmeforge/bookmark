import type {
  IListItem,
  TMediaStatus,
} from "@/entities/media/model/convex/constants";

export interface IAppState {
  currentFilter: TMediaStatus;
  list: IListItem[] | null;
  isCreateSheetOpen: boolean;
}

export interface IAppStateContextProps extends IAppState {
  updateFilter: (filter: TMediaStatus) => void;
  updateList: (list: IListItem[] | null) => void;
  toggleCreateSheet: () => void;
}

export type AppStateAction =
  | { type: "UPDATE_FILTER"; payload: TMediaStatus }
  | { type: "UPDATE_LIST"; payload: IListItem[] | null }
  | { type: "TOGGLE_CREATE_SHEET"; payload: boolean };
