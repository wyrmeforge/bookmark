import { AppStateContext } from '@/components/providers/app-state-provider';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/user-debounce';
import { useContext, useEffect, useState } from 'react';

const SearchInput = () => {
  const { searchValue, updateSearchValue } = useContext(AppStateContext);

  const [inputValue, setInputValue] = useState(searchValue);
  const debouncedValue = useDebounce(inputValue, 300);

  // Sync input with context when debouncedValue changes
  useEffect(() => {
    if (debouncedValue !== searchValue) {
      updateSearchValue(debouncedValue);
    }
  }, [debouncedValue, searchValue, updateSearchValue]);

  // Optional: sync input when context changes externally
  useEffect(() => {
    setInputValue(searchValue);
  }, [searchValue]);

  return (
    <Input
      className='max-w-[300px]'
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      placeholder='Пошук'
    />
  );
};

export default SearchInput;
