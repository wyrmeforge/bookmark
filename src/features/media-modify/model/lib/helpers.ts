import { MediaStatus } from '@/shared/enums';
import { FormFields, ModifyFormValues } from '../dto/types';

export const formDefaultValues: ModifyFormValues = {
  [FormFields.UnityInfo]: {
    id: 0,
    name: '',
    image: '',
    bannerImage: '',
    episodes: undefined,
  },
  [FormFields.Name]: '',
  [FormFields.ViewedCount]: undefined,
  [FormFields.Rate]: undefined,
  [FormFields.Status]: MediaStatus.Scheduled,
  [FormFields.IsFavorite]: false,
  [FormFields.Episode]: undefined,
  [FormFields.Website]: '',
  [FormFields.Comment]: '',
};
