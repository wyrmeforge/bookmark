import { z as u } from 'zod';

import { IListItem } from '@/types/list';
import UnityModifyForm from './components/unity-modify-form';
import { FormFields, FormSchema, FormVariant } from './form-config';
import { useEditUnity } from './hooks/use-edit-unity';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ReactNode } from 'react';

const EditUnity = ({
  listItem,
  children,
}: {
  listItem: IListItem;
  children: ReactNode;
}) => {
  const {
    name,
    status,
    season,
    _id: id,
    imageUrl,
    rate,
    is_favorite,
    episode,
    viewed_count,
    comment,
  } = listItem || {};

  const editUnity = useEditUnity();

  const initialValues: u.infer<typeof FormSchema> = {
    [FormFields.UnityInfo]: {
      id: id,
      name: name,
      image: imageUrl,
    },
    [FormFields.Name]: name,
    [FormFields.ViewedCount]: viewed_count,
    [FormFields.Rate]: rate,
    [FormFields.Status]: status,
    [FormFields.IsFavorite]: is_favorite,
    [FormFields.Episode]: episode,
    [FormFields.Season]: season,
    [FormFields.Comment]: comment,
  };

  function onSubmit(data: u.infer<typeof FormSchema>) {
    const updatedData = {
      ...data,
      imageUrl: data?.unity_info?.image,
    };

    delete updatedData.unity_info;
    console.log(updatedData);
    editUnity(id, updatedData);
  }

  return (
    <Dialog>
      <DialogTrigger className='w-full'>{children}</DialogTrigger>
      <DialogContent>
        <DialogDescription>Anime Edit</DialogDescription>
        <DialogTitle>Редагування</DialogTitle>
        <UnityModifyForm
          initialValues={initialValues}
          variant={FormVariant.Edit}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditUnity;
