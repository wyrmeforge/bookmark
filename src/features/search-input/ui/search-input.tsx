import { Input } from '@/shared/ui/input';
import { SearchIcon } from 'lucide-react';
import { SearchInputUIProps } from '../model/types';

const SearchInputUI = ({
  inputValue,
  onInputChange,
  isSearchVisible,
  toggleSearchVisibility,
}: SearchInputUIProps) => {
  return (
    <div className='flex flex-row items-center gap-2'>
      {isSearchVisible && (
        <Input
          autoFocus
          aria-label='Search'
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder='Пошук'
        />
      )}
      <SearchIcon
        onClick={toggleSearchVisibility}
        aria-label='Toggle search input'
        className='hover:cursor-pointer hover:stroke-white'
        color='grey'
        size={20}
      />
    </div>
  );
};

export { SearchInputUI };
