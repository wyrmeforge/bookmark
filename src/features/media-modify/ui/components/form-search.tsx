import { useState } from "react";
import { useDebounce } from "@/shared/lib";
import { FormCommandBox } from "@/shared/ui/form-command-box";
import { useSearchMedia } from "../../model/hooks/use-search-media";

export const FormSearch = () => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 300);

  const { animeList, isAnimeListLoading } = useSearchMedia(debouncedSearch);

  return (
    <FormCommandBox
      isLoading={isAnimeListLoading}
      items={animeList}
      name="unity_info"
      onSearchChange={setSearchValue}
      placeholder="Виберіть зі списку"
    />
  );
};
