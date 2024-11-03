import { fetcher } from '@/lib/utils';
import useSWR from 'swr';

export const useSearchAnime = (query: string | null) => {
  const { data, isLoading } = useSWR(
    query ? `${process.env.NEXT_PUBLIC_ANIME_URL}?filter[text]=${query}` : null,
    fetcher
  );

  const formattedData = data?.data?.map((item: typeof data) => ({
    id: item.id,
    name: item?.attributes?.titles?.en || item?.attributes?.canonicalTitle,
    image: item?.attributes?.posterImage?.large,
  }));

  return {
    animeList: formattedData,
    isAnimeListLoading: isLoading,
  };
};
