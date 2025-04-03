import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CommandList } from 'cmdk';
import { Check, ChevronsDown, ChevronsUp } from 'lucide-react';
import clsx from 'clsx';
import { useDebounce } from '@/hooks/user-debounce';
import { ICommandBoxProps } from './types';
import { FieldValues } from 'react-hook-form';

const FormCommandBox = <T extends FieldValues>({
  control,
  name,
  items,
  handleSearch,
  placeholder,
  error,
}: ICommandBoxProps<T>) => {
  const [searchValue, setSearchValue] = useState('');
  const [open, setOpen] = useState(false);

  const debounceValue = useDebounce(searchValue);

  useEffect(() => {
    handleSearch?.(debounceValue);
  }, [handleSearch, debounceValue]);

  return (
    <FormField
      control={control}
      name={name}
      rules={{ required: true }}
      render={({ field }) => (
        <FormItem className='z-40 flex flex-col'>
          <FormLabel>Аніме</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant='outline'
                  role='combobox'
                  aria-required
                  className={clsx('justify-between truncate', {
                    'text-muted-foreground': !field.value,
                    'border-red-500': !!error,
                  })}
                  onClick={() => setOpen(true)}
                >
                  {field?.value?.name ? field.value.name : placeholder}
                  {open ? (
                    <ChevronsUp size={16} className='opacity-50' />
                  ) : (
                    <ChevronsDown size={16} className='opacity-50' />
                  )}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <FormMessage />
            <PopoverContent
              style={{ width: 'var(--radix-popper-anchor-width)' }}
              asChild
              align='center'
              className='p-0'
            >
              <Command shouldFilter={false} className='w-full'>
                <CommandList className='w-full'>
                  <CommandInput
                    placeholder='Почніть вводити назву'
                    value={searchValue}
                    onValueChange={setSearchValue}
                    required
                  />
                  <CommandEmpty>Нічого не знайдено.</CommandEmpty>
                  <CommandGroup>
                    {items?.map((item) => (
                      <CommandItem
                        onSelect={() => {
                          field.onChange(item);
                          setOpen(false);
                        }}
                        value={item.id}
                        key={item.id}
                        className='gap-2'
                      >
                        <Check
                          size={20}
                          className={clsx('opacity-0', {
                            'opacity-100': item.id == field.value.id,
                          })}
                        />
                        {item?.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
  );
};

export default FormCommandBox;
