import { fetcher } from '@/lib/utils';
import { useEffect } from 'react';
import useSWR from 'swr';

const myFetcher = (...args) => {
  return fetch(...args, {
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNmFiOWNhZmYwYWZjYTFkODMwMzE3MTRkYjQ5ZmM4OSIsInN1YiI6IjY2NGExYmEwYTg3YjJlYTBhMzY2MWY4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zkpUYd16gRUaIW4zc_PzM51BZ0-_wXlpxaMe6Ug7qwM',
    },
  }).then((res) => res.json());
};

export const useSearchMovie = (query: string | null) => {
  const { data, isLoading } = useSWR(
    query ? `https://api.themoviedb.org/3/search/movie?query=${query}` : null,
    myFetcher
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
