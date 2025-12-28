import type { ICreateListItem } from "@/entities/media/model/convex/constants";
import type { TMediaModifyFormValues } from "@/features/media-modify/model/helpers";

export const mapCreateMediaPayload = (
  formData: TMediaModifyFormValues
): ICreateListItem => {
  const { unity_info: unityInfo } = formData;

  if (!unityInfo) {
    throw new Error("Missing unity_info in form data");
  }

  const { id: mediaApiId, name: unityName, image } = unityInfo;

  return {
    mediaApiId: String(mediaApiId),
    isFavorite: !!formData.isFavorite,
    name: formData.name ?? unityName,
    rate: formData.rate,
    image,
    status: formData.status,
    episodesCount: formData.episode,
    website: formData.website,
    viewedCount: formData.viewedCount,
    comment: formData.comment,
  };
};
