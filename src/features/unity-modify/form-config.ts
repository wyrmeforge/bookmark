import { Filters } from '@/enums/filters';
import { z as u } from 'zod';

export enum FormFields {
  UnityInfo = 'unity_info',
  Name = 'name',
  ViewedCount = 'viewed_count',
  Rate = 'rate',
  Status = 'status',
  IsFavorite = 'is_favorite',
  Episode = 'episode',
  Season = 'season',
  Comment = 'comment',
}

export enum FormVariant {
  Create,
  Edit,
}

export const FormSchema = u.object({
  [FormFields.UnityInfo]: u
    .object({
      id: u.string(),
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
        return !/^0\d+$/.test(value) && num >= 0 && num <= 10;
      },
      {
        message: 'Оцінка повинна бути числом від 0 до 10!',
      }
    )
    .optional(),
  [FormFields.Status]: u.string(),
  [FormFields.IsFavorite]: u.boolean().optional(),
  [FormFields.Episode]: u.string().optional(),
  [FormFields.Season]: u.string().optional(),
  [FormFields.Comment]: u.string().optional(),
});

export const DefaultValues: u.infer<typeof FormSchema> = {
  [FormFields.UnityInfo]: {
    id: '',
    name: '',
    image: '',
  },
  [FormFields.Name]: '',
  [FormFields.ViewedCount]: '',
  [FormFields.Rate]: '',
  [FormFields.Status]: Filters.InFuture,
  [FormFields.IsFavorite]: false,
  [FormFields.Episode]: '',
  [FormFields.Season]: '',
  [FormFields.Comment]: '',
};
