import { fetcher } from '@/lib/utils';
import useSWR from 'swr';

export const useSearchAnime = (query: string | null) => {
  const { data, isLoading } = useSWR(
    query ? `https://kitsu.io/api/edge/anime?filter[text]=${query}` : null,
    fetcher
  );

  const formattedData = data?.data?.map((item: typeof data) => ({
    id: item.id,
    name: item?.attributes?.titles?.en || item?.attributes?.canonicalTitle,
    image:
      item?.attributes?.posterImage?.original ||
      item?.attributes?.coverImage?.original,
  }));

  return {
    animeList: formattedData,
    isAnimeListLoading: isLoading,
  };
};
