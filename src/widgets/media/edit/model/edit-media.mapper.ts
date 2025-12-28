import type { IUpdateListItem } from "@/entities/media/model/convex/constants";
import type { TMediaModifyFormValues } from "@/features/media-modify/model/helpers";

export const mapEditMediaPayload = (
  mediaData: TMediaModifyFormValues
): IUpdateListItem => {
  if (!mediaData) {
    throw new Error("Missing mediaData in form data");
  }

  return {
    mediaApiId: String(mediaData?.unity_info.id),
    isFavorite: Boolean(mediaData.isFavorite),
    name: String(mediaData.name),
    rate: mediaData.rate,
    status: mediaData.status,
    episodesCount: mediaData.episode,
    viewedCount: mediaData.viewedCount,
    comment: mediaData.comment,
  };
};
