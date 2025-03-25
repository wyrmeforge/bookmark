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
import { Form, FormControl } from '@/components/ui/form';
import FormInput from '@/components/form/input';
import FormSelect from '@/components/form/select';
import FormCheckbox from '@/components/form/checkbox';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import FormCommandBox from '@/components/form/command-box';

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
    defaultValues: initialValues || DefaultValues,
    mode: 'all',
  });

  const formStatusFieldValue = form.watch(FormFields.Status);

  const isCompleted = formStatusFieldValue === Filters.Completed;
  const isInFuture = formStatusFieldValue === Filters.InFuture;
  const isEditable = !(isCompleted || isInFuture);

  const { contentList, setSearchValue } = useSearchUnity();

  const isCreatingForm = variant === FormVariant.Create;

  const {
    formState: { errors, isSubmitSuccessful },
  } = form;

  useEffect(() => {
    if (isSubmitSuccessful) {
      form.reset();
    }
  }, [form, isSubmitSuccessful]);

  return (
    <Form {...form}>
      <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
        {isCreatingForm && (
          <FormCommandBox
            items={contentList}
            placeholder='Виберіть зі списку'
            name={FormFields.UnityInfo}
            handleSearch={setSearchValue}
            control={form.control}
            error={errors?.[FormFields.UnityInfo]?.message}
          />
        )}
        <FormInput
          label='Власна назва'
          placeholder='Введіть власну назву'
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
            error={errors?.[FormFields.Rate]?.message}
          />
        </div>
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
        <FormCheckbox
          disabled={!isCompleted}
          label='Додати до улюблених'
          control={form.control}
          name={FormFields.IsFavorite}
        />
        <Button className='w-full' type='submit'>
          {isCreatingForm ? 'Додати' : 'Редагувати'}
        </Button>
      </form>
    </Form>
  );
};

export default UnityModifyForm;
