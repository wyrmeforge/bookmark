import { fetcher, useDebounce } from '@/shared/lib';
import { useState } from 'react';
import useSWR from 'swr';
import { SEARCH_MEDIA_QUERY } from '../api';
import { SearchMediaResponse } from '../dto';

export const useSearchMedia = () => {
  const [searchValue, setSearchValue] = useState('');

  const debouncedSearch = useDebounce(searchValue, 300);

  const { data, isLoading } = useSWR<SearchMediaResponse>(
    [SEARCH_MEDIA_QUERY, { search: debouncedSearch }],
    fetcher
  );

  const formattedData = data?.Page?.media?.map((item: any) => ({
    id: item.id,
    name: item.title.english || item.title.native,
    image: item.coverImage.extraLarge,
    bannerImage: item.bannerImage,
    episodes: item.episodes,
    genres: item.genres,
    seasonYear: item.seasonYear,
  }));

  return {
    animeList: formattedData,
    setSearchValue,
    isAnimeListLoading: isLoading,
  };
};
