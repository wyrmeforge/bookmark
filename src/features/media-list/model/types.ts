import type { ListMediaId } from "@/entities/media";
import type { MediaStatus } from "@/shared/enums";

export type UseMediaActionsProps = {
  mediaItemId: ListMediaId;
  isFavorite?: boolean;
};

export type UseMediaActionsReturn = {
  toggleFavorite: () => Promise<void>;
  changeStatus: (newStatus: MediaStatus) => Promise<void>;
};
