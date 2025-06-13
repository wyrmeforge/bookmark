'use client';

import { AppStateContext } from '@/app/providers/app-state-provider';
import { useDebounce } from '@/hooks/user-debounce';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { SearchIcon } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';

const SearchInput = () => {
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

  return (
    <div className='flex flex-row items-center gap-2'>
      <Button
        aria-label='Toggle search input'
        onClick={() => setIsSearchVisible((prev) => !prev)}
        variant='ghost'
      >
        <SearchIcon className=' hover:stroke-white' color='grey' size={20} />
      </Button>
      {isSearchVisible && (
        <Input
          className='max-w-[300px]'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder='Пошук'
        />
      )}
    </div>
  );
};

export default SearchInput;
