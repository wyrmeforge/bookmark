import { useContext, useEffect, useState } from 'react';
import { AppStateContext } from '@/app/providers/app-state-provider';
import { useDebounce } from '@/shared/lib/hooks/user-debounce';

export const useSearchInput = () => {
  const { searchValue, updateSearchValue } = useContext(AppStateContext);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const [inputValue, setInputValue] = useState(searchValue);
  const debouncedValue = useDebounce(inputValue, 300);

  useEffect(() => {
    if (debouncedValue !== searchValue) {
      updateSearchValue(debouncedValue);
    }
  }, [debouncedValue, searchValue, updateSearchValue]);

  useEffect(() => {
    setInputValue(searchValue);
  }, [searchValue]);

  return {
    inputValue,
    setInputValue,
    isSearchVisible,
    setIsSearchVisible,
  };
};
