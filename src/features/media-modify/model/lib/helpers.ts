import { MediaStatus } from '@/shared/enums';
import { FormFields, ModifyFormValues } from '../dto/types';

export const formDefaultValues: ModifyFormValues = {
  [FormFields.UnityInfo]: {
    id: 0,
    name: '',
    image: '',
    bannerImage: '',
  },
  [FormFields.Name]: '',
  [FormFields.ViewedCount]: '',
  [FormFields.Rate]: undefined,
  [FormFields.Status]: MediaStatus.Scheduled,
  [FormFields.IsFavorite]: false,
  [FormFields.Episode]: '',
  [FormFields.Website]: '',
  [FormFields.Comment]: '',
};
