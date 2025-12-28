"use client";

import { api } from "@convex/api";
import { useMutation } from "convex/react";
import { useCallback, useEffect, useState } from "react";
import type { IListItem } from "@/entities/media/model/convex/constants";
import { StorageKeys } from "@/shared/enums/storage";
import { useDebounce } from "@/shared/lib/hooks/user-debounce";
import type { UseMediaSearchReturn } from "./types";
import { useOpenShortcut } from "./use-open-shortcut";

export const useMediaSearch = (): UseMediaSearchReturn => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 300);

  const [results, setResults] = useState<IListItem[] | null>(null); // null = loading
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Recent search items, persisted in localStorage
  const [recent, setRecentState] = useState<IListItem[]>(() => {
    if (typeof window === "undefined") {
      return []; // SSR check
    }
    try {
      const stored = localStorage.getItem(StorageKeys.RecentSearchItem);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const searchMutation = useMutation(api.lists.searchMedia);

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

  const handleSelect = useCallback((item: IListItem) => {
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
      } catch {
        // Silently ignore localStorage errors (e.g., private browsing)
      }
      return updated;
    });

    setIsSearchOpen(false);
    setSearchValue("");
  }, []);

  const onRecentSelect = useCallback(() => {
    setIsSearchOpen(false);
    setSearchValue("");
  }, []);

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
    isInitEmpty: !(hasSearchInput || hasResults || hasRecentItems),
    showRecentItems: !hasSearchInput && hasRecentItems,
    showResults: hasResults,
  };
};
