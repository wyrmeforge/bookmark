import type { ListMediaStatus } from "@/entities/media";
import { MediaStatus } from "@/shared/enums";

export const getTranslatedMediaUserStatus = (status: ListMediaStatus) => {
  const statusTranslations = {
    [MediaStatus.All]: "Всі",
    [MediaStatus.Abandoned]: "Закинуто",
    [MediaStatus.Completed]: "Завершено",
    [MediaStatus.Favorite]: "Улюблені",
    [MediaStatus.Postponed]: "Відкладено",
    [MediaStatus.Scheduled]: "Заплановано",
    [MediaStatus.Watching]: "Дивлюсь",
  };

  return statusTranslations[status] ?? "";
};
