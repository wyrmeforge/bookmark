import type {
  TMediaId,
  TMediaStatus,
} from "@/entities/media/model/convex/constants";

export interface UseMediaActionsProps {
  mediaItemId: TMediaId;
  isFavorite?: boolean;
}

export interface UseMediaActionsReturn {
  toggleFavorite: () => Promise<void>;
  changeStatus: (newStatus: TMediaStatus) => Promise<void>;
}
