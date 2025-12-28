import { api } from "@convex/api";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import type { TMediaId } from "@/entities/media/model/convex/constants";
import type { TMediaModifyFormValues } from "@/features/media-modify/model/helpers";
import { mapEditMediaPayload } from "./edit-media.mapper";

export const useEditMedia = () => {
  const updateListItem = useMutation(api.lists.updateListItem);

  const editUnity = async (id: TMediaId, data: TMediaModifyFormValues) => {
    const payload = mapEditMediaPayload(data);
    const response = await updateListItem({ id, newData: payload });

    if (response.success) {
      toast.success("Успішно змінено!");
    } else {
      toast.error("Не вдалось змінити!", {
        description: "Щось пішло не так.",
      });
    }
  };

  return editUnity;
};
