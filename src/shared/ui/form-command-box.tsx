'use client';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/shared/ui/command';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { Check, ChevronsDown, ChevronsUp, Loader } from 'lucide-react';
import clsx from 'clsx';
import { FieldValues, FieldPath, useFormContext } from 'react-hook-form';
import { Button } from '@/shared/ui/button';
import { useLayoutEffect, useState } from 'react';

type ListItem = {
  id: string;
  name: string;
  image: string;
};

export interface IFormCommandBoxProps<T extends FieldValues> {
  name: FieldPath<T>;
  items?: ListItem[];
  onSearchChange?: (val: string) => void;
  placeholder: string;
  isLoading: boolean;
}

const FormCommandBox = <T extends FieldValues>({
  name,
  items,
  onSearchChange,
  placeholder,
  isLoading,
}: IFormCommandBoxProps<T>) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const haveError = !!errors[name];

  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (val: string) => {
    setInputValue(val);
    onSearchChange?.(val);
  };

  // Open command box after popover render
  useLayoutEffect(() => {
    const popoverTimeout = setTimeout(() => {
      setOpen(true);
    }, 500);

    return () => {
      clearTimeout(popoverTimeout);
      setInputValue('');
    };
  }, []);

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
              <Button
                variant='outline'
                role='combobox'
                aria-required
                className={clsx('justify-between truncate', {
                  'text-muted-foreground': !field.value,
                  'border-red-500': !!haveError,
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
            </PopoverTrigger>
            <FormMessage />
            <PopoverContent
              style={{ width: 'var(--radix-popper-anchor-width)' }}
              align='center'
              className='p-0'
            >
              <FormControl>
                <Command shouldFilter={false} className='w-full'>
                  <CommandInput
                    autoFocus
                    placeholder='Почніть вводити назву'
                    value={inputValue}
                    onValueChange={handleInputChange}
                    required
                  />
                  <CommandList>
                    <CommandEmpty className='flex items-center justify-center py-2'>
                      {!inputValue && (
                        <span className='animate-pulse text-sm'>
                          Почніть вводити назву аніме.
                        </span>
                      )}
                      {inputValue && isLoading && (
                        <Loader className='animate-spin' />
                      )}
                      {inputValue &&
                        Array.isArray(items) &&
                        items.length === 0 && (
                          <span className='animate-pulse text-sm'>
                            Нічого не знайдено.
                          </span>
                        )}
                    </CommandEmpty>
                    <CommandGroup>
                      {items?.map((item) => (
                        <CommandItem
                          key={item.id}
                          onSelect={() => {
                            field.onChange(item);
                            setOpen(false);
                          }}
                          className='gap-2'
                        >
                          <>
                            <Check
                              size={20}
                              className={clsx('opacity-0', {
                                'opacity-100': item.id == field.value?.id,
                              })}
                            />
                            {item?.name}
                          </>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </FormControl>
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
  );
};

export { FormCommandBox };
