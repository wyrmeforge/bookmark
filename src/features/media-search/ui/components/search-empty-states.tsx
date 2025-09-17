import { CommandEmpty } from '@/shared/ui/command';
import { InfoIcon, Loader2Icon } from 'lucide-react';

type SearchEmptyStatesProps = {
  isLoading: boolean;
  isResultsEmpty: boolean;
  isInitEmpty: boolean;
  searchValue: string;
};

const SearchEmptyStates = ({
  isLoading,
  isInitEmpty,
  isResultsEmpty,
  searchValue,
}: SearchEmptyStatesProps) => (
  <>
    {isLoading && (
      <CommandEmpty className='flex flex-col items-center justify-center gap-2 py-6'>
        <Loader2Icon className='h-6 w-6 animate-spin text-muted-foreground' />
        Завантаження…
      </CommandEmpty>
    )}
    {isResultsEmpty && (
      <CommandEmpty className='flex flex-col items-center justify-center py-6 text-muted-foreground'>
        {`За запитом "${searchValue}" нічого не знайдено.`}
      </CommandEmpty>
    )}
    {isInitEmpty && (
      <CommandEmpty className='flex items-center justify-center gap-1 py-6 text-center text-muted-foreground'>
        <span className='flex flex-row items-center gap-1 text-sm'>
          <InfoIcon />
          Почніть вводити назву аніме у полі пошуку, щоб знайти потрібні
          результати.
        </span>
      </CommandEmpty>
    )}
  </>
);

export { SearchEmptyStates };
