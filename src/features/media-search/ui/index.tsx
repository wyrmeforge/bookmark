"use client";

import { Search } from "lucide-react";
import { useAppState } from "@/shared/lib/app-state-provider";
import { Button } from "@/shared/ui/button";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/shared/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { useMediaSearch } from "../model/use-media-search";
import { FooterInfo } from "./components/footer-info";
import { RecentItems } from "./components/recent-items";
import { SearchCommandItem } from "./components/search-command-item";
import { SearchEmptyStates } from "./components/search-empty-states";

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
    <Dialog onOpenChange={setIsSearchOpen} open={isSearchOpen}>
      <DialogTrigger asChild>
        <Button
          className="flex items-center gap-2 rounded-full"
          variant="outline"
        >
          <Search size={16} />
          Пошук...
          <kbd className="ml-auto hidden rounded border px-1 text-muted-foreground text-xs sm:inline-block">
            Ctrl+K
          </kbd>
        </Button>
      </DialogTrigger>
      <DialogContent className="top-10 left-1/2 w-full max-w-2xl -translate-x-1/2 translate-y-0 overflow-hidden p-0">
        <DialogTitle className="sr-only">Пошук медіа</DialogTitle>
        <DialogDescription className="sr-only">
          Відкрийте цей діалог для пошуку медіа за назвою та перегляду
          результатів.
        </DialogDescription>
        <Command className="w-full" loop shouldFilter={false}>
          <CommandInput
            onValueChange={setSearchValue}
            placeholder="Почніть вводити назву…"
            value={searchValue}
          />
          <CommandList className="max-h-[500px] overflow-y-auto">
            {showRecentItems && (
              <RecentItems onRecentSelect={onRecentSelect} recent={recent} />
            )}
            <SearchEmptyStates
              isInitEmpty={isInitEmpty}
              isLoading={isLoading}
              isResultsEmpty={isResultsEmpty}
              searchValue={searchValue}
            />
            {showResults && (
              <CommandGroup heading="Результат">
                {results.map((item) => (
                  <SearchCommandItem
                    handleClick={() => handleSelect(item)}
                    item={item}
                    key={item._id}
                  />
                ))}
              </CommandGroup>
            )}
            <CommandSeparator />
            {!(showResults || isLoading) && (
              <CommandGroup heading="Швидкі дії">
                <CommandItem
                  className="flex w-full justify-between rounded-md px-2 py-1 hover:cursor-pointer hover:bg-gray-100"
                  onSelect={toggleCreateSheet}
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
