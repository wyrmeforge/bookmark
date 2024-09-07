import { Filters } from '@/enums/filters';
import { Module } from '@/enums/modules';
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
      imageUrl: u.string(),
    })
    .nullable(),
  [FormFields.Name]: u.string().optional(),
  [FormFields.ViewedCount]: u.string().optional(),
  [FormFields.Rate]: u.string().min(0).max(10).optional(),
  [FormFields.Status]: u.string(),
  [FormFields.IsFavorite]: u.boolean().optional(),
  [FormFields.Episode]: u.string().optional(),
  [FormFields.Season]: u.string().optional(),
});

export const DefaultValues: u.infer<typeof FormSchema> = {
  [FormFields.UnityInfo]: null,
  [FormFields.Name]: '',
  [FormFields.ViewedCount]: undefined,
  [FormFields.Rate]: undefined,
  [FormFields.Status]: Filters.InFuture,
  [FormFields.IsFavorite]: false,
  [FormFields.Episode]: undefined,
  [FormFields.Season]: undefined,
};

export const moduleLabel: Record<Module, string> = {
  [Module.Anime]: 'Аніме',
  [Module.Movie]: 'Фільм',
  [Module.Cartoon]: 'Мультфільм',
};
