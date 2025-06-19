import { useSearchAnime } from '@/shared/lib/media/use-search-anime';
import { useState } from 'react';

export const useSearchMedia = () => {
  const [searchValue, setSearchValue] = useState('');

  const { animeList, isAnimeListLoading } = useSearchAnime(searchValue);

  return {
    contentList: animeList,
    isLoading: isAnimeListLoading,
    setSearchValue,
  };
};
