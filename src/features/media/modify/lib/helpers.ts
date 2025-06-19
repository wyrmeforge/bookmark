import { MediaStatus } from '@/shared/enums/media';
import { FormFields, ModifyFormValues } from '../model/types';

export const formDefaultValues: ModifyFormValues = {
  [FormFields.UnityInfo]: {
    id: '',
    name: '',
    image: '',
  },
  [FormFields.Name]: '',
  [FormFields.ViewedCount]: '',
  [FormFields.Rate]: '',
  [FormFields.Status]: MediaStatus.Scheduled,
  [FormFields.IsFavorite]: false,
  [FormFields.Episode]: '',
  [FormFields.Season]: '',
  [FormFields.Comment]: '',
};
