import { AppStateContext } from '@/components/providers/app-state-provider';
import { Input } from '@/components/ui/input';
import { useSearchDebounce } from '@/hooks/user-search-debounce';
import { useContext, useEffect, useState } from 'react';

const SearchInput = () => {
  const [inputValue, setInputValue] = useState('');

  const { searchValue, updateSearchValue } = useContext(AppStateContext);

  const debounceValue = useSearchDebounce(inputValue);

  useEffect(() => {
    if (!debounceValue) return;

    updateSearchValue(debounceValue);
  }, [debounceValue, updateSearchValue]);

  return (
    <Input
      value={searchValue}
      onChange={(e) => updateSearchValue(e.target.value)}
      placeholder='Пошук'
    />
  );
};

export default SearchInput;
