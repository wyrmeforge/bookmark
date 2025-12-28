import { useState } from "react";
import { useDebounce } from "@/shared/lib/hooks/user-debounce";
import { FormCommandBox } from "@/shared/ui/form-command-box";
import { useSearchMedia } from "../../model/hooks/use-search-media";

export const FormSearch = () => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 300);

  const { animeList, isAnimeListLoading } = useSearchMedia(debouncedSearch);

  const transformedAnimeList = animeList.map((item) => ({
    ...item,
    id: String(item.id),
  }));

  return (
    <FormCommandBox
      isLoading={isAnimeListLoading}
      items={transformedAnimeList}
      name="unity_info"
      onSearchChange={setSearchValue}
      placeholder="Виберіть зі списку"
    />
  );
};
