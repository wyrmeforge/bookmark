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
    bannerImage: unityInfo.bannerImage,
    totalEpisodes: unityInfo.episodes,
    rate: formData.rate,
    imageUrl: unityInfo.image,
    status: formData.status,
    episode: formData.episode,
    website: formData.website,
    viewedCount: formData.viewedCount,
    comment: formData.comment,
    genres: unityInfo.genres,
    seasonYear: String(unityInfo.seasonYear),
  };
};
