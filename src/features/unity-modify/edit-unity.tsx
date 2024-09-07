import { z as u } from 'zod';

import { IListItem } from '@/types/list';
import UnityModifyForm from './components/unity-modify-form';
import { FormFields, FormSchema, FormVariant } from './form-config';
import { useEditUnity } from './hooks/use-edit-unity';
import { Id } from '../../../convex/_generated/dataModel';

const EditUnity = ({
  listItem,
  unityId,
}: {
  listItem: IListItem;
  unityId: Id<'lists'>;
}) => {
  const { name, status, season, rate, is_favorite, episode, viewed_count } =
    listItem || {};

  const editUnity = useEditUnity();

  const initialValues: u.infer<typeof FormSchema> = {
    [FormFields.UnityInfo]: null,
    [FormFields.Name]: name,
    [FormFields.ViewedCount]: viewed_count,
    [FormFields.Rate]: rate,
    [FormFields.Status]: status,
    [FormFields.IsFavorite]: is_favorite,
    [FormFields.Episode]: episode,
    [FormFields.Season]: season,
  };

  function onSubmit(data: u.infer<typeof FormSchema>) {
    editUnity(unityId, data);
  }

  return (
    <UnityModifyForm
      initialValues={initialValues}
      variant={FormVariant.Edit}
      onSubmit={onSubmit}
    />
  );
};

export default EditUnity;
