import type { TMediaStatus } from "@/entities/media/model/convex/constants";

export const getTranslatedMediaUserStatus = (status: TMediaStatus) => {
  const statusTranslations = {
    all: "Всі",
    abandoned: "Закинуто",
    completed: "Завершено",
    favorite: "Улюблені",
    postponed: "Відкладено",
    scheduled: "Заплановано",
    watching: "Дивлюсь",
  };

  return statusTranslations[status] ?? "";
};
