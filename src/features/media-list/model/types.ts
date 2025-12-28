import type { ListMediaId } from "@/entities/media";
import type { MediaStatus } from "@/shared/enums";

export interface UseMediaActionsProps {
  mediaItemId: ListMediaId;
  isFavorite?: boolean;
}

export interface UseMediaActionsReturn {
  toggleFavorite: () => Promise<void>;
  changeStatus: (newStatus: MediaStatus) => Promise<void>;
}
