'use client';

import { Button } from '@/shared/ui/button';
import { Search } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/shared/ui/command';
import { useMediaSearch } from '../model';
import {
  FooterInfo,
  RecentItems,
  SearchCommandItem,
  SearchEmptyStates,
} from './components';
import { useAppState } from '@/shared/lib';

export const MediaSearch = () => {
  const { toggleCreateSheet } = useAppState();
  const {
    searchValue,
    setSearchValue,
    showRecentItems,
    showResults,
    isInitEmpty,
    isLoading,
    isResultsEmpty,
    recent,
    results,
    onRecentSelect,
    handleSelect,
    isSearchOpen,
    setIsSearchOpen,
  } = useMediaSearch();

  return (
    <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          className='flex items-center gap-2 rounded-full'
        >
          <Search size={16} />
          Пошук...
          <kbd className='ml-auto hidden rounded border px-1 text-xs text-muted-foreground sm:inline-block'>
            Ctrl+K
          </kbd>
        </Button>
      </DialogTrigger>
      <DialogContent className='left-1/2 top-10 w-full max-w-2xl -translate-x-1/2 translate-y-0 overflow-hidden p-0'>
        <DialogTitle className='sr-only'>Пошук медіа</DialogTitle>
        <DialogDescription className='sr-only'>
          Відкрийте цей діалог для пошуку медіа за назвою та перегляду
          результатів.
        </DialogDescription>
        <Command loop shouldFilter={false} className='w-full'>
          <CommandInput
            placeholder='Почніть вводити назву…'
            value={searchValue}
            onValueChange={setSearchValue}
          />
          <CommandList className='max-h-[500px] overflow-y-auto'>
            {showRecentItems && (
              <RecentItems recent={recent} onRecentSelect={onRecentSelect} />
            )}
            <SearchEmptyStates
              isInitEmpty={isInitEmpty}
              isLoading={isLoading}
              isResultsEmpty={isResultsEmpty}
              searchValue={searchValue}
            />
            {showResults && (
              <CommandGroup heading='Результат'>
                {results.map((item) => (
                  <SearchCommandItem
                    key={item._id}
                    item={item}
                    handleClick={() => handleSelect(item)}
                  />
                ))}
              </CommandGroup>
            )}
            <CommandSeparator />
            {!showResults && !isLoading && (
              <CommandGroup heading='Швидкі дії'>
                <CommandItem
                  onSelect={toggleCreateSheet}
                  className='flex w-full justify-between rounded-md px-2 py-1 hover:cursor-pointer hover:bg-gray-100'
                >
                  <div>Додати аніме</div>
                  <CommandShortcut>Ctrl+D</CommandShortcut>
                </CommandItem>
              </CommandGroup>
            )}
          </CommandList>
          <FooterInfo />
        </Command>
      </DialogContent>
    </Dialog>
  );
};
