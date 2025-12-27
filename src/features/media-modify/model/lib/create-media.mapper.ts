import { ModifyFormValues } from '../dto';

export const createMediaMapper = (formData: ModifyFormValues) => {
  const unityInfo = formData.unity_info;

  if (!unityInfo) {
    throw new Error('Missing unity_info in form data');
  }

  return {
    mediaApiId: String(unityInfo.id),
    isFavorite: formData.isFavorite ?? false,
    name: formData.name || unityInfo.name,
    rate: formData.rate,
    image: unityInfo.image,
    status: formData.status,
    episodesCount: formData.episode,
    website: formData.website,
    viewedCount: formData.viewedCount,
    comment: formData.comment,
    // genres: unityInfo.genres,
    // seasonYear: String(unityInfo.seasonYear),
  };
};
