import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useEffect } from 'react';
import { Form } from '@/shared/ui/form';
import { Button } from '@/shared/ui/button';

import { SheetClose, SheetFooter } from '@/shared/ui/sheet';
import { MediaStatus } from '@/shared/enums';
import { FormInput } from '@/shared/ui/form-input';
import { FormCheckbox } from '@/shared/ui/form-checkbox';
import { FormTextarea } from '@/shared/ui/form-textarea';
import { FormSelect } from '@/shared/ui/form-select';
import { FormCommandBox } from '@/shared/ui/form-command-box';
import { useAppState } from '@/shared/lib';
import {
  formDefaultValues,
  FormFields,
  FormVariant,
  MediaModifyFormProps,
  ModifyFormSchema,
  ModifyFormValues,
  useSearchMedia,
} from '../model';
import { MODIFY_MEDIA_STATUS_ITEMS } from '../config';

const MediaModifyForm = ({
  onSubmit,
  variant,
  initialValues,
}: MediaModifyFormProps) => {
  const { updateFilter } = useAppState();

  const form = useForm<ModifyFormValues>({
    resolver: zodResolver(ModifyFormSchema),
    defaultValues: { ...formDefaultValues, ...initialValues },
    mode: 'onChange',
  });

  const { animeList, setSearchValue, isAnimeListLoading } = useSearchMedia();

  const {
    formState: { isSubmitSuccessful },
    watch,
    handleSubmit,
    reset,
  } = form;

  const isCreating = variant === FormVariant.Create;

  const currentMedia = watch(FormFields.UnityInfo);

  const submitCtaButtonLabel = isCreating ? 'Додати' : 'Змінити';

  const currentStatus = watch(FormFields.Status);

  const isCompleted = currentStatus === MediaStatus.Completed;

  useEffect(() => {
    if (isSubmitSuccessful && isCreating) {
      updateFilter(currentStatus);
      reset();
    }
  }, [isSubmitSuccessful, currentStatus, updateFilter, reset, isCreating]);

  useEffect(() => {
    form.setValue(FormFields.ViewedCount, isCompleted ? '1' : '0');
  }, [isCompleted, form, currentMedia]);

  return (
    <Form {...form}>
      <form
        className='flex h-full w-full flex-col justify-between'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='flex flex-col gap-6'>
          {isCreating && (
            <FormCommandBox
              isLoading={isAnimeListLoading}
              items={animeList}
              placeholder='Виберіть зі списку'
              name={FormFields.UnityInfo}
              onSearchChange={setSearchValue}
            />
          )}
          <FormInput
            label='Власна назва'
            placeholder='Введіть власну назву'
            name={FormFields.Name}
            tooltipDescription='Введіть назву українською'
          />
          <FormSelect
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
              label='Серія'
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
