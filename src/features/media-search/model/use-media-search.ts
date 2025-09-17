'use client';

import { useEffect, useState, useCallback } from 'react';
import { useDebounce } from '@/shared/lib';
import { useMutation } from 'convex/react';
import { ListMedia } from '@/entities/media';
import { UseMediaSearchReturn } from './types';
import { api } from '@convex/api';
import { Routes, StorageKeys } from '@/shared/enums';
import { useRouter } from 'next/navigation';
import { useOpenShortcut } from './use-open-shortcut';

export const useMediaSearch = (): UseMediaSearchReturn => {
  const router = useRouter();

  const [searchValue, setSearchValue] = useState('');
  const debouncedValue = useDebounce(searchValue, 300);

  const [results, setResults] = useState<ListMedia[] | null>(null); // null = loading
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Recent search items, persisted in localStorage
  const [recent, setRecentState] = useState<ListMedia[]>(() => {
    if (typeof window === 'undefined') return []; // SSR check
    try {
      const stored = localStorage.getItem(StorageKeys.RecentSearchItem);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const searchMutation = useMutation(api.lists.searchMedia);

  const goToMediaDetailsPage = useCallback(
    (mediaId: number) => router.push(`${Routes.Home}/${mediaId}`),
    [router]
  );

  // Perform search query
  const search = useCallback(
    async (query: string) => {
      if (!query) {
        setResults(null); // reset results if input is empty
        return;
      }

      setResults(null); // show loading state
      try {
        const res = await searchMutation({ value: query });
        setResults(res || []);
      } catch {
        setResults([]);
      }
    },
    [searchMutation]
  );

  const handleSelect = useCallback(
    (item: ListMedia) => {
      // Update recent items, persist in localStorage
      setRecentState((prev) => {
        const updated = [item, ...prev.filter((r) => r._id !== item._id)].slice(
          0,
          5
        );
        try {
          localStorage.setItem(
            StorageKeys.RecentSearchItem,
            JSON.stringify(updated)
          );
        } catch {}
        return updated;
      });

      setIsSearchOpen(false);
      setSearchValue('');
      goToMediaDetailsPage(item.mediaId);
    },
    [setRecentState, setSearchValue, goToMediaDetailsPage]
  );

  const onRecentSelect = useCallback(
    (mediaId: number) => {
      setIsSearchOpen(false);
      setSearchValue('');
      goToMediaDetailsPage(mediaId);
    },
    [goToMediaDetailsPage, setSearchValue]
  );

  useEffect(() => {
    search(debouncedValue);
  }, [debouncedValue, search]);

  // Keyboard shortcut: open/close search dialog
  useOpenShortcut(() => setIsSearchOpen((prev) => !prev));

  // Derived flags for UI state
  const hasSearchInput = !!debouncedValue;
  const hasResults = Array.isArray(results) && results.length > 0;
  const noResultsYet = results === null;
  const hasRecentItems = recent.length > 0;

  return {
    searchValue,
    setSearchValue,
    debouncedValue,
    results: results || [],
    recent,
    onRecentSelect,
    handleSelect,
    isSearchOpen,
    setIsSearchOpen,
    isLoading: hasSearchInput && noResultsYet,
    isResultsEmpty: hasSearchInput && !noResultsYet && !hasResults,
    isInitEmpty: !hasSearchInput && !hasResults && !hasRecentItems,
    showRecentItems: !hasSearchInput && hasRecentItems,
    showResults: hasResults,
  };
};
