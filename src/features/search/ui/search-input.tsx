import { Input } from '@/shared/ui/input';
import { SearchIcon, XIcon } from 'lucide-react';
import { SearchInputUIProps } from '../model/types';
import { Button } from '@/shared/ui/button';

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
          name='search'
          autoFocus
          aria-label='Search'
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder='Пошук'
          endAdornment={
            inputValue && (
              <Button onClick={() => onInputChange('')} variant='ghost'>
                <XIcon />
              </Button>
            )
          }
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
