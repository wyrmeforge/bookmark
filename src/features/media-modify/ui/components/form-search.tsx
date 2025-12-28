import { FormCommandBox } from '@/shared/ui/form-command-box';
import { useState } from 'react';
import { useDebounce } from '@/shared/lib';
import { useSearchMedia } from '../../model/hooks/use-search-media';

export const FormSearch = () => {
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearch = useDebounce(searchValue, 300);

  const { animeList, isAnimeListLoading } = useSearchMedia(debouncedSearch);

  return (
    <FormCommandBox
      isLoading={isAnimeListLoading}
      items={animeList}
      placeholder='Виберіть зі списку'
      name='unity_info'
      onSearchChange={setSearchValue}
    />
  );
};
