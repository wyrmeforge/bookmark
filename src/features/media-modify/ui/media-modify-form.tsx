import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Form } from '@/shared/ui/form';
import { Button } from '@/shared/ui/button';

import { FormInput } from '@/shared/ui/form-input';
import { FormCheckbox } from '@/shared/ui/form-checkbox';
import { FormTextarea } from '@/shared/ui/form-textarea';
import { FormCommandBox } from '@/shared/ui/form-command-box';
import { useAppState } from '@/shared/lib';
import { MediaStatus } from '@/shared/enums';
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
import Image from 'next/image';
import { FormStepperInput } from '@/shared/ui/form-number-input';
import { Skeleton } from '@/shared/ui/skeleton';
import { HeartIcon } from 'lucide-react';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/shared/ui/dialog';

import { FormSelect } from '@/shared/ui/form-select';

export const MediaModifyForm = ({
  onSubmit,
  variant,
  initialValues,
}: MediaModifyFormProps) => {
  const { updateFilter, isCreateSheetOpen } = useAppState();

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

  const currentStatus = watch(FormFields.Status);
  const isFavorite = watch(FormFields.IsFavorite);

  const isCompleted = currentStatus === MediaStatus.Completed;

  const selectedAnime = watch(FormFields.UnityInfo);

  useEffect(() => {
    if (isSubmitSuccessful && isCreating) {
      updateFilter(currentStatus);
      reset();
    }
  }, [isSubmitSuccessful, currentStatus, updateFilter, reset, isCreating]);

  useEffect(() => {
    form.setValue(FormFields.ViewedCount, isCompleted ? 1 : 0);

    if (selectedAnime.episodes) {
      form.setValue(
        FormFields.Episode,
        isCompleted ? selectedAnime.episodes : 0
      );
    }
  }, [isCompleted, form, selectedAnime]);

  useEffect(() => {
    if (!isCreateSheetOpen) {
      setSearchValue('');
      reset();
    }
  }, [isCreateSheetOpen, setSearchValue, reset]);

  return (
    <DialogContent
      className='left-1/2 top-10 max-h-[90vh] w-full max-w-2xl -translate-x-1/2
             translate-y-0 overflow-hidden p-0'
    >
      <div className='relative h-60 shrink-0 border-b md:h-60'>
        {selectedAnime?.bannerImage ? (
          <Image
            src={selectedAnime.bannerImage}
            alt={selectedAnime.name}
            fill
            sizes='(max-width: 768px) 100vw, 50vw'
            className='object-cover'
          />
        ) : (
          <Skeleton className='absolute inset-0 h-full w-full animate-none bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 ' />
        )}
        <div className='absolute inset-0 bg-gradient-to-t from-background/100 via-background/40 to-background/20' />
        <div className='absolute bottom-4 left-4'>
          <DialogTitle className='text-lg font-semibold leading-tight'>
            {isCreating ? 'Додавання нового аніме' : 'Редагування аніме'}
          </DialogTitle>
          <DialogDescription className='mt-1 text-sm text-muted-foreground'>
            {isCreating
              ? 'Заповніть форму, щоб додати аніме до вашого списку.'
              : 'Оновіть інформацію про обране аніме.'}
          </DialogDescription>
        </div>
      </div>
      <Form {...form}>
        <form
          className='flex h-full min-h-0 w-full flex-col'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='min-h-0 flex-1 space-y-6 overflow-y-auto p-4'>
            {isCreating && (
              <FormCommandBox
                isLoading={isAnimeListLoading}
                items={animeList}
                placeholder='Виберіть зі списку'
                name={FormFields.UnityInfo}
                onSearchChange={setSearchValue}
              />
            )}
            <FormSelect
              name='status'
              label='Статус'
              items={MODIFY_MEDIA_STATUS_ITEMS}
            />
            <div className='space-y-3 rounded-lg bg-muted/30 p-4 transition-all hover:bg-muted'>
              <FormInput
                label='Власна назва'
                placeholder='Введіть назву українською'
                name={FormFields.Name}
              />
              <FormInput
                label='Де дивлюсь?'
                placeholder='Введіть посилання на сайт'
                name={FormFields.Website}
              />
            </div>
            <div className='space-y-3 rounded-lg bg-muted/30 p-4 transition-all hover:bg-muted'>
              <div className='grid grid-cols-1 gap-3 md:grid-cols-3'>
                <FormStepperInput
                  label='Разів переглянуто'
                  min={0}
                  max={100}
                  hideMaxValue
                  name={FormFields.ViewedCount}
                />
                <FormStepperInput
                  min={0}
                  max={10}
                  label='Оцінка'
                  name={FormFields.Rate}
                />
                <FormStepperInput
                  tooltipDescription='Введіть к-ть переглянутих серій'
                  label='Серій'
                  max={selectedAnime?.episodes}
                  name={FormFields.Episode}
                />
              </div>
            </div>
            <div className='space-y-3 rounded-lg bg-muted/30 p-4 transition-all hover:bg-muted'>
              <FormCheckbox
                checkedIcon={<HeartIcon fill='red' />}
                uncheckedIcon={<HeartIcon />}
                noThumbAnimation
                label={
                  isFavorite ? 'Видалити з улюблених' : 'Додати до улюблених'
                }
                name={FormFields.IsFavorite}
              />
              <FormTextarea name={FormFields.Comment} placeholder='Нотатка' />
            </div>
          </div>
          <DialogFooter className='sticky bottom-0 flex flex-row gap-2 border-t border-muted bg-background p-4'>
            <DialogClose
              type='button'
              className='w-full rounded-md border border-muted px-4 py-2 text-sm font-medium transition-colors  hover:text-red-800'
            >
              Скасувати
            </DialogClose>
            <Button className='w-full' type='submit'>
              {isCreating ? 'Додати' : 'Змінити'}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};
