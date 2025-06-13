import { Filters } from '@/enums/filters';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z as u } from 'zod';
import {
  DefaultValues,
  FormFields,
  FormSchema,
  FormVariant,
} from '../form-config';
import { useSearchUnity } from '../hooks/use-search-unity';
import { useEffect } from 'react';
import { Close as DialogCloseButton } from '@radix-ui/react-dialog';
import { FormCheckbox } from '@/features/form/checkbox';
import { FormInput } from '@/features/form/input';
import { FormSelect } from '@/features/form/select';
import { Form } from '@/shared/ui/form';
import { Button } from '@/shared/ui/button';
import FormCommandBox from '@/features/form/command-box';

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
  const form = useForm<u.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { ...DefaultValues, ...initialValues },
    mode: 'all',
  });

  const entryData = form.watch(FormFields.UnityInfo);
  const status = form.watch(FormFields.Status);

  const { contentList, setSearchValue } = useSearchUnity();
  const {
    formState: { errors, isSubmitSuccessful },
    watch,
    control,
    handleSubmit,
    reset,
  } = form;

  const formStatus = watch(FormFields.Status);
  const isCreating = variant === FormVariant.Create;
  const isCompleted = formStatus === Filters.Completed;
  const isEditable = ![Filters.Completed, Filters.InFuture].includes(
    formStatus
  );

  useEffect(() => {
    if (status && status === 'completed') {
      form.setValue(FormFields.Episode, entryData?.episodeCount);
    }
  }, [entryData?.episodeCount, form, status]);

  useEffect(() => {
    if (isSubmitSuccessful) reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <Form {...form}>
      <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
        {isCreating && (
          <FormCommandBox
            items={contentList}
            placeholder='Виберіть зі списку'
            name={FormFields.UnityInfo}
            handleSearch={setSearchValue}
            control={control}
            error={errors?.[FormFields.UnityInfo]?.message}
          />
        )}
        <FormInput
          label='Власна назва'
          placeholder='Введіть власну назву'
          control={control}
          name={FormFields.Name}
        />
        <FormSelect
          control={control}
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
            label='Оцінка'
            placeholder='Введіть оцінку'
            control={form.control}
            name={FormFields.Rate}
            error={errors?.[FormFields.Rate]?.message}
          />
        </div>
        <div className='flex gap-3'>
          <FormInput
            label='Серій'
            type='number'
            placeholder='Введіть номер'
            control={control}
            name={FormFields.Episode}
          />
          <FormInput
            disabled={!isEditable}
            label='Сезон'
            placeholder='Введіть сезон'
            control={control}
            name={FormFields.Season}
          />
        </div>
        <FormCheckbox
          disabled={!isCompleted}
          label='Додати до улюблених'
          control={control}
          name={FormFields.IsFavorite}
        />
        <FormInput
          label='Коментар'
          // placeholder='Введіть номер'
          control={control}
          name={FormFields.Comment}
        />
        <div className='flex justify-between gap-4'>
          <DialogCloseButton className='w-full'>Скасувати</DialogCloseButton>
          <Button className='w-full' type='submit'>
            Зберегти
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UnityModifyForm;
