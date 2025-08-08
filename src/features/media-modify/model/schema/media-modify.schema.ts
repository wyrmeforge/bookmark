import { z as u } from 'zod';
import { MediaStatus } from '@/shared/enums';
import { FormFields } from '../dto';

export const ModifyFormSchema = u.object({
  [FormFields.UnityInfo]: u
    .object({
      id: u.number(),
      name: u.string(),
      image: u.string(),
      bannerImage: u.string(),
    })
    .refine((data) => !!data.id && !!data.name && !!data.image, {
      message: "Поле обов'язкове",
    }),
  [FormFields.Name]: u.string().optional(),
  [FormFields.ViewedCount]: u.string().optional(),
  [FormFields.Website]: u.string().optional(),
  [FormFields.Rate]: u.number().optional(),
  [FormFields.Status]: u.union([
    u.literal(MediaStatus.All),
    u.literal(MediaStatus.Favorite),
    u.literal(MediaStatus.Abandoned),
    u.literal(MediaStatus.Completed),
    u.literal(MediaStatus.Postponed),
    u.literal(MediaStatus.Scheduled),
    u.literal(MediaStatus.Watching),
  ]),
  [FormFields.IsFavorite]: u.boolean().optional(),
  [FormFields.Episode]: u.string().optional(),
  [FormFields.Comment]: u.string().optional(),
});
