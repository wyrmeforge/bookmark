import { api } from "@convex/api";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import type { TMediaStatus } from "@/entities/media/model/convex/constants";
import type { UseMediaActionsProps, UseMediaActionsReturn } from "./types";

export const useMediaActions = ({
  mediaItemId,
  isFavorite,
}: UseMediaActionsProps): UseMediaActionsReturn => {
  const updateItem = useMutation(api.lists.updateListItem);

  const toggleFavorite = async () => {
    await updateItem({
      id: mediaItemId,
      newData: { isFavorite: !isFavorite },
    });
  };

  const changeStatus = async (status: TMediaStatus) => {
    await updateItem({ id: mediaItemId, newData: { status } });
    toast.success("Статус успішно змінено!");
  };

  return { toggleFavorite, changeStatus };
};
