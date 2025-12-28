"use client";

import clsx from "clsx";
import { Check, ChevronsDown, ChevronsUp, Loader } from "lucide-react";
import { useLayoutEffect, useState } from "react";
import {
  type FieldPath,
  type FieldValues,
  useFormContext,
} from "react-hook-form";
import { Button } from "@/shared/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/ui/command";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";

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
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (val: string) => {
    setInputValue(val);
    onSearchChange?.(val);
  };

  // Open command box after popover render
  useLayoutEffect(() => {
    const popoverTimeout = setTimeout(() => {
      setOpen(true);
    }, 0);

    return () => {
      clearTimeout(popoverTimeout);
      setInputValue("");
    };
  }, []);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="z-40 flex flex-col">
          <FormLabel>Аніме</FormLabel>
          <Popover onOpenChange={setOpen} open={open}>
            <PopoverTrigger asChild>
              <Button
                aria-required
                className={clsx("justify-between truncate", {
                  "text-muted-foreground": !field.value,
                  "border-red-500": !!haveError,
                })}
                onClick={() => setOpen(true)}
                role="combobox"
                variant="outline"
              >
                {field?.value?.name ? field.value.name : placeholder}
                {open ? (
                  <ChevronsUp className="opacity-50" size={16} />
                ) : (
                  <ChevronsDown className="opacity-50" size={16} />
                )}
              </Button>
            </PopoverTrigger>
            <FormMessage />
            <PopoverContent
              align="center"
              className="p-0"
              style={{ width: "var(--radix-popper-anchor-width)" }}
            >
              <FormControl>
                <Command className="w-full" shouldFilter={false}>
                  <CommandInput
                    autoFocus
                    onValueChange={handleInputChange}
                    placeholder="Почніть вводити назву"
                    required
                    value={inputValue}
                  />
                  <CommandList>
                    <CommandEmpty className="flex items-center justify-center py-2">
                      {!inputValue && (
                        <span className="animate-pulse text-sm">
                          Почніть вводити назву аніме.
                        </span>
                      )}
                      {inputValue && isLoading && (
                        <Loader className="animate-spin" />
                      )}
                      {inputValue &&
                        Array.isArray(items) &&
                        items.length === 0 && (
                          <span className="animate-pulse text-sm">
                            Нічого не знайдено.
                          </span>
                        )}
                    </CommandEmpty>
                    <CommandGroup>
                      {items?.map((item) => (
                        <CommandItem
                          className="gap-2"
                          key={item.id}
                          onSelect={() => {
                            field.onChange(item);
                            setOpen(false);
                          }}
                        >
                          <>
                            <Check
                              className={clsx("opacity-0", {
                                "opacity-100": item.id == field.value?.id,
                              })}
                              size={20}
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
      rules={{ required: true }}
    />
  );
};

export { FormCommandBox };
