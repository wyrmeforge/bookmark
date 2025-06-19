'use client';

import { useSearchInput } from './model/use-search-input';
import { SearchInputUI } from './ui/search-input';

const SearchInput = () => {
  const { inputValue, setInputValue, isSearchVisible, setIsSearchVisible } =
    useSearchInput();

  return (
    <SearchInputUI
      inputValue={inputValue}
      onInputChange={setInputValue}
      isSearchVisible={isSearchVisible}
      toggleSearchVisibility={() => setIsSearchVisible((prev) => !prev)}
    />
  );
};

export default SearchInput;
