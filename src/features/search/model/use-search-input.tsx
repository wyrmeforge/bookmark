import { useEffect, useState } from 'react';
import { useAppState, useDebounce } from '@/shared/lib';

export const useSearchInput = () => {
  const { searchValue, updateSearchValue } = useAppState();
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
