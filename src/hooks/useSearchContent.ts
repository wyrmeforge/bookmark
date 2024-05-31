import { Module } from '@/enums/modules';
import { useSearchAnime } from './useSearchAnime';
import { useSearchMovie } from './useSearchMovie';

export const useSearchContent = (searchValue: string, module: Module) => {
  const { animeList } = useSearchAnime(
    module === Module.Anime ? searchValue : null
  );
  const { movieList } = useSearchMovie(
    module !== Module.Anime ? searchValue : null
  );

  return {
    contentList: movieList || animeList,
  };
};
