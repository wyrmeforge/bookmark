import { useMemo } from "react";
import useSWR from "swr";
import { fetcher } from "@/shared/api/graphql-client";
import { SEARCH_MEDIA_QUERY } from "../api/search-media-query";

interface MediaItem {
  id: number;
  title: {
    english?: string;
    native: string;
  };
  coverImage: {
    extraLarge: string;
  };
  bannerImage?: string;
  episodes?: number;
  genres: string[];
  seasonYear?: number;
}

interface SearchMediaResponse {
  Page: {
    media: MediaItem[];
  };
}

export const useSearchMedia = (searchValue?: string) => {
  const { data, isLoading } = useSWR<SearchMediaResponse>(
    searchValue ? [SEARCH_MEDIA_QUERY, { search: searchValue }] : null,
    fetcher
  );

  const animeList = useMemo(
    () =>
      data?.Page?.media?.map((item: MediaItem) => ({
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
