import { fetcher } from '@/shared/lib';
import { useMemo } from 'react';
import useSWR from 'swr';
import { SEARCH_MEDIA_QUERY } from '../api/search-media-query';
import { SearchMediaResponse } from '../dto/search-media.dto';

export const useSearchMedia = (searchValue?: string) => {
  const { data, isLoading } = useSWR<SearchMediaResponse>(
    searchValue ? [SEARCH_MEDIA_QUERY, { search: searchValue }] : null,
    fetcher
  );

  const animeList = useMemo(
    () =>
      data?.Page?.media?.map((item: any) => ({
        id: item.id,
        name: item.title.english || item.title.native,
        image: item.coverImage.extraLarge,
        bannerImage: item.bannerImage,
        episodes: item.episodes,
        genres: item.genres,
        seasonYear: item.seasonYear,
      })) || [],
    [data]
  );

  return {
    animeList,
    isAnimeListLoading: isLoading,
  };
};
