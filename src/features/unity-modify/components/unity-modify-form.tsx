import React, { useContext } from 'react';

import { Filters } from '@/enums/filters';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z as u } from 'zod';
import {
  DefaultValues,
  FormFields,
  FormSchema,
  FormVariant,
  moduleLabel,
} from '../form-config';
import { Module } from '@/enums/modules';
import { useSearchUnity } from '../hooks/use-search-unity';
import { UnityStateContext } from '@/components/providers/unity-state-provider';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import FormCommandBox from '@/components/form/command-box';
import FormInput from '@/components/form/input';
import FormSelect from '@/components/form/select';
import FormCheckbox from '@/components/form/checkbox';
import { Button } from '@/components/ui/button';

interface IUnityModifyFormProps {
  onSubmit: (data: u.infer<typeof FormSchema>) => void;
  variant: FormVariant;
  initialValues?: u.infer<typeof FormSchema>;
}

const UnityModifyForm = ({
  onSubmit,
  variant,
  initialValues,
}: IUnityModifyFormProps) => {
  const { currentModule } = useContext(UnityStateContext);

  const form = useForm<u.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: initialValues || DefaultValues,
  });

  const formStatusFieldValue = form.watch(FormFields.Status);

  const isCompleted = formStatusFieldValue === Filters.Completed;
  const isInFuture = formStatusFieldValue === Filters.InFuture;
  const isEditable = !(isCompleted || isInFuture);

  const { contentList, setSearchValue } = useSearchUnity(currentModule);

  const isCreatingForm = variant === FormVariant.Create;

  return (
    <>
      <DialogHeader className='mb-2'>
        <DialogTitle>
          {isCreatingForm ? 'Додавання' : 'Редагування'}
        </DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          {isCreatingForm && (
            <FormCommandBox
              items={contentList}
              placeholder='Виберіть зі списку'
              label={moduleLabel[currentModule]}
              name={FormFields.UnityInfo}
              handleSearch={setSearchValue}
              control={form.control}
            />
          )}
          <FormInput
            required
            label='Назва'
            placeholder='Введіть назву'
            control={form.control}
            name={FormFields.Name}
          />
          <FormSelect
            control={form.control}
            name={FormFields.Status}
            placeholder='Статус'
            label='Статус'
            items={[
              { label: 'Переглянуто', value: Filters.Completed },
              { label: 'Закинуто', value: Filters.Abandoned },
              { label: 'Буду дивитись', value: Filters.InFuture },
              { label: 'Дивлюсь', value: Filters.InProgress },
            ]}
          />
          <div className='flex gap-3'>
            <FormInput
              disabled={!isCompleted}
              label='Разів переглянуто'
              placeholder='Введіть к-ть'
              control={form.control}
              name={FormFields.ViewedCount}
            />
            <FormInput
              disabled={!isCompleted}
              label='Рейтинг'
              placeholder='Введіть оцінку'
              control={form.control}
              name={FormFields.Rate}
            />
          </div>
          {currentModule === Module.Anime && (
            <div className='flex gap-3'>
              <FormInput
                disabled={!isEditable}
                label='Серія'
                placeholder='Введіть номер'
                control={form.control}
                name={FormFields.Episode}
              />
              <FormInput
                disabled={!isEditable}
                label='Сезон'
                placeholder='Введіть сезон'
                control={form.control}
                name={FormFields.Season}
              />
            </div>
          )}
          <FormCheckbox
            disabled={!isCompleted}
            label='Додати до улюблених'
            control={form.control}
            name={FormFields.IsFavorite}
          />
          <div className='flex items-center justify-end'>
            <Button type='submit'>
              {isCreatingForm ? 'Додати' : 'Редагувати'}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default UnityModifyForm;
