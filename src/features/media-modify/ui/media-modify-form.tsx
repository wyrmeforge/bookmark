import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { Form } from '@/shared/ui/form';

import { FormInput } from '@/shared/ui/form-input';
import { FormCheckbox } from '@/shared/ui/form-checkbox';
import { FormTextarea } from '@/shared/ui/form-textarea';
import { useAppState } from '@/shared/lib';
import { MediaStatus } from '@/shared/enums';
import { HeartIcon } from 'lucide-react';
import { DialogContent } from '@/shared/ui/dialog';

import { FormSelect } from '@/shared/ui/form-select';
import { useAutoFillCounts } from '../model/hooks/use-autofill-counts';
import { MediaModifyFormHeader } from './components/form-header';
import { FormStatsSection } from './components/form-stats-section';
import { useMediaModifyFormLifecycle } from '../model/hooks/use-media-modify-form';
import { FormFooter } from './components/form-footer';
import { FormSearch } from './components/form-search';
import {
  formDefaultValues,
  ModifyFormSchema,
  TMediaModifyFormValues,
} from '../model/helpers';
import { MEDIA_STATUS_FILTERS } from '@/shared/config';

interface IMediaModifyFormProps {
  onSubmit: SubmitHandler<TMediaModifyFormValues>;
  variant: 'create' | 'edit';
  initialValues?: Partial<TMediaModifyFormValues>;
}

export const MediaModifyForm = ({
  onSubmit,
  variant,
  initialValues,
}: IMediaModifyFormProps) => {
  const { isCreateSheetOpen } = useAppState();

  const form = useForm<TMediaModifyFormValues>({
    resolver: zodResolver(ModifyFormSchema),
    defaultValues: { ...formDefaultValues, ...initialValues },
    mode: 'onChange',
  });

  const {
    formState: { isSubmitSuccessful },
    watch,
    handleSubmit,
    reset,
    setValue,
  } = form;

  const [currentStatus, isFavorite, selectedAnime] = watch([
    'status',
    'isFavorite',
    'unity_info',
  ]);

  const mediaStatusFilter = useMemo(
    () =>
      MEDIA_STATUS_FILTERS.filter(
        ({ key }) => key !== 'all' && key !== 'favorite'
      ).map(({ key, label, icon, color }) => ({
        value: key,
        icon,
        label,
        color,
      })),
    []
  );

  const isCreateForm = useMemo(() => variant === 'create', [variant]);

  const isCompleted = useMemo(
    () => currentStatus === MediaStatus.Completed,
    [currentStatus]
  );

  useAutoFillCounts({ setValue, isCompleted, selectedAnime });

  useMediaModifyFormLifecycle({
    isSubmitSuccessful: isSubmitSuccessful,
    isDialogOpen: isCreateSheetOpen,
    reset: reset,
  });

  return (
    <DialogContent className='left-1/2 top-1/2 max-h-[90vh] w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-hidden p-0'>
      <MediaModifyFormHeader
        isCreate={isCreateForm}
        bannerAlt={selectedAnime?.name}
        bannerImage={selectedAnime?.bannerImage}
      />
      <Form {...form}>
        <form
          className='flex h-full min-h-0 w-full flex-col'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='min-h-0 flex-1 space-y-6 overflow-y-auto p-4'>
            {isCreateForm && <FormSearch />}
            <FormSelect
              name='status'
              label='Статус'
              items={mediaStatusFilter}
            />
            <div className='space-y-3 rounded-lg bg-muted/30 p-4 transition-all hover:bg-muted'>
              <FormInput
                label='Власна назва'
                placeholder='Введіть назву українською'
                name='name'
              />
              <FormInput
                label='Де дивлюсь?'
                placeholder='Введіть посилання на сайт'
                name='website'
              />
            </div>
            <FormStatsSection animeEpisodes={selectedAnime.episodes} />
            <div className='space-y-3 rounded-lg bg-muted/30 p-4 transition-all hover:bg-muted'>
              <FormCheckbox
                checkedIcon={<HeartIcon fill='red' />}
                uncheckedIcon={<HeartIcon />}
                noThumbAnimation
                label={
                  isFavorite ? 'Видалити з улюблених' : 'Додати до улюблених'
                }
                name='isFavorite'
              />
              <FormTextarea name='comment' placeholder='Нотатка' />
            </div>
          </div>
          <FormFooter isCreateForm={isCreateForm} />
        </form>
      </Form>
    </DialogContent>
  );
};
