import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useContext, useEffect } from 'react';
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
import { MediaStatus } from '@/shared/enums/media';
import { SheetClose, SheetFooter } from '@/shared/ui/sheet';
import { AppStateContext } from '@/app/providers/app-state-provider';

const MediaModifyForm = ({
  onSubmit,
  variant,
  initialValues,
}: MediaModifyFormProps) => {
  const { updateFilter } = useContext(AppStateContext);
  const form = useForm<ModifyFormValues>({
    resolver: zodResolver(ModifyFormSchema),
    defaultValues: { ...formDefaultValues, ...initialValues },
    mode: 'onChange',
  });

  const { contentList, setSearchValue, isLoading } = useSearchMedia();

  const {
    formState: { isSubmitSuccessful },
    watch,
    handleSubmit,
    reset,
  } = form;

  const isCreating = variant === FormVariant.Create;

  const submitCtaButtonLabel = isCreating ? 'Додати' : 'Змінити';

  const currentStatus = watch(FormFields.Status);

  const isScheduled = currentStatus === MediaStatus.Scheduled;
  const isCompleted = currentStatus === MediaStatus.Completed;

  const isSeriesAndSeasonDisable = isScheduled || isCompleted;

  useEffect(() => {
    if (isSubmitSuccessful && isCreating) {
      updateFilter(currentStatus);
      reset();
    }
  }, [isSubmitSuccessful, currentStatus, updateFilter, reset, isCreating]);

  useEffect(() => {
    // Set viewed count to at least one if 'Completed' status selected
    form.setValue(FormFields.ViewedCount, isCompleted ? '1' : '');
  }, [isCompleted, form]);

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
            name={FormFields.Status}
            placeholder='Статус'
            label='Статус'
            items={MODIFY_MEDIA_STATUS_ITEMS}
          />
          <div className='flex gap-3'>
            <FormInput
              disabled={!isCompleted}
              type='number'
              label='Разів переглянуто'
              placeholder='Введіть к-ть повторних переглядів'
              name={FormFields.ViewedCount}
            />
            <FormInput
              disabled={!isCompleted}
              type='number'
              label='Оцінка'
              placeholder='Введіть оцінку від 1 до 10'
              name={FormFields.Rate}
            />
          </div>
          <div className='flex gap-3'>
            <FormInput
              disabled={isSeriesAndSeasonDisable}
              label='Серій'
              type='number'
              placeholder='Введіть к-ть переглянутих серій'
              name={FormFields.Episode}
            />
            <FormInput
              disabled={isSeriesAndSeasonDisable}
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
        <SheetFooter className='mt-4 flex flex-row justify-between gap-4'>
          <SheetClose className='h-full w-full rounded-md border border-muted'>
            Скасувати
          </SheetClose>
          <Button className='w-full' type='submit'>
            {submitCtaButtonLabel}
          </Button>
        </SheetFooter>
      </form>
    </Form>
  );
};

export { MediaModifyForm };
