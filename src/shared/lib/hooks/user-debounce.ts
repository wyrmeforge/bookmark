'use client';

import { useEffect, useState } from 'react';

export const useDebounce = (
  searchValue: string,
  debounceMs: number = 500
): string => {
  const [debounceValue, setDebounceValue] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(searchValue);
    }, debounceMs);

    return () => {
      clearTimeout(handler);
    };
  }, [debounceMs, searchValue]);

  return debounceValue;
};
