import { z as u } from 'zod';
import { MediaStatus } from '@/shared/enums';
import { FormFields } from '../dto';

export const ModifyFormSchema = u.object({
  [FormFields.UnityInfo]: u
    .object({
      id: u.number(),
      name: u.string(),
      image: u.string(),
    })
    .refine((data) => !!data.id && !!data.name && !!data.image, {
      message: "Поле обов'язкове",
    }),
  [FormFields.Name]: u.string().optional(),
  [FormFields.ViewedCount]: u.string().optional(),
  [FormFields.Rate]: u
    .string()
    .refine(
      (value) => {
        if (value === '') return true;
        const num = parseInt(value, 10);
        return !/^0\d+$/.test(value) && num >= 1 && num <= 10;
      },
      {
        message: 'Оцінка повинна бути числом від 1 до 10!',
      }
    )
    .optional(),
  [FormFields.Status]: u.enum([
    MediaStatus.Abandoned,
    MediaStatus.Completed,
    MediaStatus.Postponed,
    MediaStatus.Scheduled,
    MediaStatus.Watching,
  ]),
  [FormFields.IsFavorite]: u.boolean().optional(),
  [FormFields.Episode]: u.string().optional(),
  [FormFields.Season]: u.string().optional(),
  [FormFields.Comment]: u.string().optional(),
});
