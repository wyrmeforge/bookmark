import { fetcher, useDebounce } from '@/shared/lib';
import { useState } from 'react';
import useSWR from 'swr';
import { SEARCH_MEDIA_QUERY } from '../api';
import { SearchMediaResponse } from '../dto';

export const useSearchMedia = () => {
  const [searchValue, setSearchValue] = useState('');

  const shouldFetch = !!searchValue?.trim();
  const debouncedSearch = useDebounce(searchValue, 300);

  const { data, isLoading } = useSWR<SearchMediaResponse>(
    shouldFetch ? [SEARCH_MEDIA_QUERY, { search: debouncedSearch }] : null,
    fetcher
  );

  const formattedData = data?.Page?.media?.map((item: any) => ({
    id: item.id,
    name: item.title.english || item.title.native,
    image: item.coverImage.extraLarge,
    bannerImage: item.bannerImage,
    episodes: item.episodes,
  }));

  return {
    animeList: formattedData,
    setSearchValue,
    isAnimeListLoading: isLoading,
  };
};
