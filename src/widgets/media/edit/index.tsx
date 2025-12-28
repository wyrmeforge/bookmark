"use client";

import { PenIcon } from "lucide-react";
import { useMemo } from "react";
import type { IListItem } from "@/entities/media/model/convex/constants";
import type { TMediaModifyFormValues } from "@/features/media-modify/model/helpers";
import { MediaModifyForm } from "@/features/media-modify/ui/media-modify-form";
import { Dialog, DialogTrigger } from "@/shared/ui/dialog";
import { DropdownMenuItem } from "@/shared/ui/dropdown-menu";
import { useEditMedia } from "./model/use-edit-media";

interface IEditMediaProps {
  mediaItem: IListItem;
}

const EditMedia = ({ mediaItem }: IEditMediaProps) => {
  const editUnity = useEditMedia();

  const initialValues: TMediaModifyFormValues = useMemo(() => {
    if (!mediaItem) {
      return {} as TMediaModifyFormValues;
    }

    return {
      unity_info: {
        id: Number(mediaItem.mediaApiId),
        name: mediaItem.name,
        image: mediaItem.image,
        episodes: Number(mediaItem.episodesCount) || 0,
      },
      name: mediaItem.name,
      viewedCount: mediaItem.viewedCount,
      rate: mediaItem.rate,
      status: mediaItem.status,
      isFavorite: mediaItem.isFavorite,
      episode: mediaItem.episodesCount,
      comment: mediaItem.comment,
    };
  }, [mediaItem]);

  const onSubmit = (data: TMediaModifyFormValues) => {
    if (mediaItem?._id) {
      editUnity(mediaItem._id, data);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem
          aria-label="Редагувати медіа"
          className="cursor-pointer"
          onSelect={(e) => e.preventDefault()}
        >
          <PenIcon className="mr-2 h-4 w-4" />
          Редагувати
        </DropdownMenuItem>
      </DialogTrigger>
      <MediaModifyForm
        initialValues={initialValues}
        onSubmit={onSubmit}
        variant="edit"
      />
    </Dialog>
  );
};

export { EditMedia };
