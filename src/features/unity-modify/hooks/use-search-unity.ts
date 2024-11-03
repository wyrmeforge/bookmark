import { useSearchAnime } from '@/hooks/use-search-anime';
import { useState } from 'react';

export const useSearchUnity = () => {
  const [searchValue, setSearchValue] = useState('');

  const { animeList } = useSearchAnime(searchValue);

  return {
    contentList: animeList,
    setSearchValue,
  };
};
