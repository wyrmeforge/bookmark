import type { IListItem } from "@/entities/media/model/convex/constants";

export interface UseMediaSearchReturn {
  searchValue: string;
  setSearchValue: (value: string) => void;
  debouncedValue: string;
  results: IListItem[];
  recent: IListItem[];
  isLoading: boolean;
  isResultsEmpty: boolean;
  isInitEmpty: boolean;
  showRecentItems: boolean;
  showResults: boolean;
  onRecentSelect: (mediaId: string) => void;
  handleSelect: (item: IListItem) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
