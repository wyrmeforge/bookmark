import { z as u } from 'zod';
import { SubmitHandler } from 'react-hook-form';
import { ReactNode } from 'react';
import { ModifyFormSchema } from '../schema/media-modify.schema';
import { ListMediaId, ListMediaStatus } from '@/entities/media';

export enum FormFields {
  UnityInfo = 'unity_info',
  Name = 'name',
  ViewedCount = 'viewedCount',
  Rate = 'rate',
  Status = 'status',
  IsFavorite = 'isFavorite',
  Episode = 'episode',
  Website = 'website',
  Comment = 'comment',
}

export enum FormVariant {
  Create,
  Edit,
}

export enum ErrorCodes {
  ITEM_ALREADY_EXISTS = 'ITEM_ALREADY_EXISTS',
}

export type ModifyFormValues = u.infer<typeof ModifyFormSchema>;

// Create Media
export type UseCreateMediaReturn = {
  createNewMedia: (mediaData: ModifyFormValues) => Promise<void>;
};

export type CreateMediaProps = {
  initialStatus?: ListMediaStatus;
  customTrigger?: ReactNode;
};

// Form Component
export type MediaModifyFormProps = {
  onSubmit: SubmitHandler<ModifyFormValues>;
  variant: FormVariant;
  initialValues?: Partial<ModifyFormValues>;
};

// Delete Media
export type UseDeleteMediaItemReturn = {
  deleteMedia: (id: ListMediaId) => Promise<void>;
};
