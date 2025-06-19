import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useEffect } from 'react';
import { Form } from '@/shared/ui/form';
import { Button } from '@/shared/ui/button';
import {
  FormFields,
  FormVariant,
  MediaModifyFormProps,
  ModifyFormValues,
} from '../model/types';
import {
  FormCheckbox,
  FormCommandBox,
  FormInput,
  FormSelect,
  FormTextarea,
} from '@/features/form';
import { ModifyFormSchema } from '../model/form-schema';
import { formDefaultValues } from '../lib/helpers';
import { MODIFY_MEDIA_STATUS_ITEMS } from '../config/modify-media-status';
import { useSearchMedia } from '../model/hooks/use-search-media';

const MediaModifyForm = ({
  onSubmit,
  variant,
  initialValues,
}: MediaModifyFormProps) => {
  const form = useForm<ModifyFormValues>({
    resolver: zodResolver(ModifyFormSchema),
    defaultValues: { ...formDefaultValues, ...initialValues },
    mode: 'onChange',
  });

  const { contentList, setSearchValue, isLoading } = useSearchMedia();

  const {
    formState: { isSubmitSuccessful },
    control,
    handleSubmit,
    reset,
  } = form;

  const isCreating = variant === FormVariant.Create;

  const submitCtaButtonLabel = isCreating ? 'Додати' : 'Змінити';

  useEffect(() => {
    if (isSubmitSuccessful && isCreating) reset();
  }, [isSubmitSuccessful, reset, isCreating]);

  return (
    <Form {...form}>
      <form
        className='flex h-full w-full flex-col justify-between'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='flex flex-col gap-6'>
          {isCreating && (
            <FormCommandBox
              isLoading={isLoading}
              items={contentList}
              placeholder='Виберіть зі списку'
              name={FormFields.UnityInfo}
              onSearchChange={setSearchValue}
            />
          )}
          <FormInput
            label='Власна назва'
            placeholder='Введіть власну назву'
            name={FormFields.Name}
          />
          <FormSelect
            control={control}
            name={FormFields.Status}
            placeholder='Статус'
            label='Статус'
            items={MODIFY_MEDIA_STATUS_ITEMS}
          />
          <div className='flex gap-3'>
            <FormInput
              type='number'
              label='Разів переглянуто'
              placeholder='Введіть к-ть повторних переглядів'
              name={FormFields.ViewedCount}
            />
            <FormInput
              type='number'
              label='Оцінка'
              placeholder='Введіть оцінку від 1 до 10'
              name={FormFields.Rate}
            />
          </div>
          <div className='flex gap-3'>
            <FormInput
              label='Серій'
              type='number'
              placeholder='Введіть к-ть переглянутих серій'
              name={FormFields.Episode}
            />
            <FormInput
              type='number'
              label='Сезон'
              placeholder='Введіть к-ть переглянутих сезонів'
              name={FormFields.Season}
            />
          </div>
          <FormCheckbox
            label='Додати до улюблених'
            name={FormFields.IsFavorite}
          />
          <FormTextarea name={FormFields.Comment} placeholder='Коментар' />
        </div>
        <div className='flex justify-between gap-4'>
          <Button variant='outline' className='w-full'>
            Скасувати
          </Button>
          <Button className='w-full' type='submit'>
            {submitCtaButtonLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export { MediaModifyForm };
