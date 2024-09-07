import { Module } from '@/enums/modules';
import { useSearchAnime } from '@/hooks/use-search-anime';
import { useSearchMovie } from '@/hooks/useSearchMovie';
import { useState } from 'react';

export const useSearchUnity = (currentModule: Module) => {
  const [searchValue, setSearchValue] = useState('');

  const { animeList } = useSearchAnime(
    currentModule === Module.Anime ? searchValue : null
  );
  const { movieList } = useSearchMovie(
    currentModule !== Module.Anime ? searchValue : null
  );

  return {
    contentList: movieList || animeList,
    setSearchValue,
  };
};
