import { fetcher } from '@/shared/lib/utils';
import { useEffect } from 'react';
import useSWR from 'swr';

const myFetcher = (...args) => {
  return fetch(...args, {
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer 16ab9caff0afca1d83031714db49fc89',
    },
  }).then((res) => res.json());
};

export const useSearchMovie = (query: string | null) => {
  const { data, isLoading } = useSWR(
    query
      ? `https://api.themoviedb.org/3/search/movie?query=${query}?api_key=666ff5cefabb1b43b595fedb1f2dc7f5`
      : null,
    fetcher
  );

  const formattedData = data?.results?.map((item) => ({
    id: item.id,
    name: item?.title || item?.original_title,
    image: 'https://image.tmdb.org/t/p/w500' + item?.poster_path,
  }));

  return {
    movieList: formattedData,
    isMovieListLoading: isLoading,
  };
};
