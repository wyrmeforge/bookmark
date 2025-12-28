import type { OmittedListMedia } from "@/entities/media";
import type { TMediaModifyFormValues } from "@/features/media-modify/model/helpers";

export const mapEditMediaPayload = (
  mediaData: TMediaModifyFormValues
): OmittedListMedia => {
  if (!mediaData) {
    throw new Error("Missing mediaData in form data");
  }

  return {
    mediaApiId: String(mediaData?.unity_info.id),
    isFavorite: Boolean(mediaData.isFavorite),
    name: String(mediaData.name),
    rate: mediaData.rate,
    image: mediaData?.unity_info.image,
    status: mediaData.status,
    episodesCount: mediaData.episode,
    viewedCount: mediaData.viewedCount,
    comment: mediaData.comment,
  };
};
