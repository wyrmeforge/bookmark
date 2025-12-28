import type { ListMedia } from "@/entities/media";

export interface UseMediaSearchReturn {
  searchValue: string;
  setSearchValue: (value: string) => void;
  debouncedValue: string;
  results: ListMedia[];
  recent: ListMedia[];
  isLoading: boolean;
  isResultsEmpty: boolean;
  isInitEmpty: boolean;
  showRecentItems: boolean;
  showResults: boolean;
  onRecentSelect: (mediaId: number) => void;
  handleSelect: (item: ListMedia) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
