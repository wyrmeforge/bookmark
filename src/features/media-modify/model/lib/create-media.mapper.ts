import { ModifyFormValues } from '../dto';

export const createMediaMapper = (formData: ModifyFormValues) => {
  const unityInfo = formData.unity_info;

  if (!unityInfo) {
    throw new Error('Missing unity_info in form data');
  }

  return {
    mediaId: unityInfo.id,
    isFavorite: formData.isFavorite ?? false,
    name: formData.name || unityInfo.name,
    rate: formData.rate,
    imageUrl: unityInfo.image,
    status: formData.status,
    episode: formData.episode,
    season: formData.season,
    viewedCount: formData.viewedCount,
    comment: formData.comment,
  };
};
