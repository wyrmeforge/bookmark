import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Form } from '@/shared/ui/form';
import { Button } from '@/shared/ui/button';
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetTitle,
} from '@/shared/ui/sheet';
import { FormInput } from '@/shared/ui/form-input';
import { FormCheckbox } from '@/shared/ui/form-checkbox';
import { FormTextarea } from '@/shared/ui/form-textarea';
import { FormCommandBox } from '@/shared/ui/form-command-box';
import { useAppState, useMobile } from '@/shared/lib';
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
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { cn } from '@/shared/lib/utils';
import { FormStepperInput } from '@/shared/ui/form-number-input';
import { Skeleton } from '@/shared/ui/skeleton';
import { HeartCrackIcon, HeartIcon } from 'lucide-react';

export const MediaModifyForm = ({
  onSubmit,
  variant,
  initialValues,
}: MediaModifyFormProps) => {
  const { updateFilter } = useAppState();
  const { isMobile } = useMobile();

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

  const currentStatusItem = MODIFY_MEDIA_STATUS_ITEMS.find(
    (item) => item.value === currentStatus
  );

  return (
    <SheetContent
      side={isMobile ? 'bottom' : 'right'}
      withClose={false}
      className='flex h-full w-full max-w-none flex-col overflow-hidden bg-background p-0 md:w-[620px] md:max-w-none md:rounded-bl-none md:rounded-tl-[64px]'
    >
      <div className='relative h-40 shrink-0 border-b md:h-52'>
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
        <div className='absolute right-3 top-3 flex items-center gap-2'>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant='secondary'
                className={cn(
                  'h-auto w-[110px] p-2 transition-colors',
                  currentStatusItem?.color?.bg
                )}
              >
                {currentStatusItem?.label}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              sideOffset={5}
              align='end'
              side='bottom'
              className='w-40 p-1'
            >
              {MODIFY_MEDIA_STATUS_ITEMS.map(({ value, icon: Icon, label }) => (
                <Button
                  key={value}
                  type='button'
                  variant='ghost'
                  className={cn(
                    'flex w-full flex-row justify-between rounded px-2 py-1 text-left text-sm',
                    {
                      'bg-zinc-700': currentStatusItem?.value === value,
                    }
                  )}
                  onClick={() => form.setValue(FormFields.Status, value)}
                >
                  <Icon />
                  {label}
                </Button>
              ))}
            </PopoverContent>
          </Popover>
          <SheetClose className='rounded-xl p-2 px-4 transition-all hover:bg-background'>
            ✕
          </SheetClose>
        </div>
        <div className='absolute bottom-4 left-4'>
          <SheetTitle className='text-lg font-semibold leading-tight'>
            {isCreating ? 'Додавання нового аніме' : 'Редагування аніме'}
          </SheetTitle>
          <SheetDescription className='mt-1 text-sm text-muted-foreground'>
            {isCreating
              ? 'Заповніть форму, щоб додати аніме до вашого списку.'
              : 'Оновіть інформацію про обране аніме.'}
          </SheetDescription>
        </div>
      </div>
      <Form {...form}>
        <form
          className='flex h-full w-full flex-col justify-between'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='flex-1 space-y-6 overflow-y-auto p-4 pb-52 md:pb-0'>
            {isCreating && (
              <FormCommandBox
                isLoading={isAnimeListLoading}
                items={animeList}
                placeholder='Виберіть зі списку'
                name={FormFields.UnityInfo}
                onSearchChange={setSearchValue}
              />
            )}
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
                uncheckedIcon={<HeartCrackIcon />}
                noThumbAnimation
                label={
                  isFavorite ? 'Видалити з улюблених' : 'Додати до улюблених'
                }
                name={FormFields.IsFavorite}
              />
              <FormTextarea name={FormFields.Comment} placeholder='Примітка' />
            </div>
          </div>
          <SheetFooter className='sticky bottom-0 flex flex-row gap-2 border-t border-muted bg-background p-4'>
            <SheetClose
              type='button'
              className='w-full rounded-md border border-muted px-4 py-2 text-sm font-medium'
            >
              Скасувати
            </SheetClose>
            <Button className='w-full' type='submit'>
              {isCreating ? 'Додати' : 'Змінити'}
            </Button>
          </SheetFooter>
        </form>
      </Form>
    </SheetContent>
  );
};
