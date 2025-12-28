import { api } from "@convex/api";
import { useMutation } from "convex/react";
import { useCallback } from "react";
import { toast } from "sonner";
import type { TMediaId } from "@/entities/media/model/convex/constants";

interface IUseDeleteMediaItemReturn {
  deleteMedia: (id: TMediaId) => Promise<void>;
}

export const useDeleteMedia = (): IUseDeleteMediaItemReturn => {
  const deleteListItem = useMutation(api.lists.deleteListItem);

  const deleteMedia = useCallback(
    async (id: TMediaId) => {
      try {
        await deleteListItem({ id });
        toast.success("Видалено успішно");
      } catch (err) {
        toast.error("Не вдалось видалити!", {
          description: `Помилка ${err}`,
        });
      }
    },
    [deleteListItem]
  );

  return { deleteMedia };
};
