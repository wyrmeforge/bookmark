import React, { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';
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
import { Check, ChevronsDown } from 'lucide-react';

const FormCommandBox = ({
  control,
  name,
  label,
  items,
  handleSearch,
  placeholder,
}) => {
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    if (!searchValue) return;

    handleSearch?.(searchValue);
  }, [handleSearch, searchValue]);

  return (
    <FormField
      control={control}
      name={name}
      rules={{ required: true }}
      render={({ field }) => {
        return (
          <FormItem className='flex flex-col'>
            <FormLabel>{label}</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant='outline'
                    role='combobox'
                    aria-required
                    className={cn(
                      'justify-between truncate',
                      !field.value && 'text-muted-foreground'
                    )}
                  >
                    {field?.value ? field.value.name : placeholder}
                    <ChevronsDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className='w-[462px] p-0'>
                <Command shouldFilter={false} className='w-full'>
                  <CommandList>
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
                            field.onChange({
                              id: item.id?.toString(),
                              name: item?.name,
                              imageUrl: item?.image,
                            });
                          }}
                          value={item?.id}
                          key={item?.id}
                          className='gap-2'
                        >
                          <Check
                            size={20}
                            className={cn('opacity-0', {
                              'opacity-100': item?.id == field.value?.id,
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
        );
      }}
    />
  );
};

export default FormCommandBox;
