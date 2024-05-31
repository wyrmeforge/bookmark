'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z as u } from 'zod';

import { Button } from '@/components/ui/button';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';

import { toast } from '@/components/ui/use-toast';
import { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';

import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Switch } from '../ui/switch';
import FormCommandBox from '../form/command-box';
import FormInput from '../form/input';
import FormSelect from '../form/select';
import { Module } from '@/enums/modules';
import { Filters } from '@/enums/filters';
import { useSearchContent } from '@/hooks/useSearchContent';
import { cn } from '@/lib/utils';

enum FormFields {
  AnimeInfo = 'anime_info',
  OwnName = 'own_name',
  ViewedCount = 'viewed_count',
  Rate = 'rate',
  Status = 'status',
  IsFavorite = 'is_favorite',
}

const FormSchema = u.object({
  anime_info: u.object({
    id: u.string() || u.number(),
    name: u.string(),
    imageUrl: u.string(),
  }),
  own_name: u.string().optional(),
  viewed_count: u.string().optional(),
  rate: u.string().optional(),
  status: u.string(),
  is_favorite: u.boolean().optional(),
  episode: u.string().optional(),
  season: u.string().optional(),
});

const CreateUnity = ({
  list: currentList,
  currentModule,
  currentFilter,
}: {
  currentModule: Module;
}) => {
  const [searchValue, setSearchValue] = useState('');

  const defaultValues: u.infer<typeof FormSchema> = {
    [FormFields.AnimeInfo]: null,
    [FormFields.OwnName]: '',
    [FormFields.ViewedCount]: '1',
    [FormFields.Rate]: '',
    [FormFields.Status]:
      currentFilter === Filters.Favorite ? Filters.Completed : Filters.InFuture,
    [FormFields.IsFavorite]: currentFilter === Filters.Favorite || undefined,
    episode: '',
    season: '',
  };

  const form = useForm<u.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const addListItem = useMutation(api.lists.addItemToList);

  const { contentList } = useSearchContent(searchValue, currentModule);

  function onSubmit(data: u.infer<typeof FormSchema>) {
    const {
      anime_info,
      own_name,
      viewed_count,
      rate,
      status,
      episode,
      season,
      is_favorite,
    } = data;

    const isAlreadyExist = currentList.find(
      (item) => item.animeId === anime_info?.id
    );

    if (isAlreadyExist) {
      return toast({
        title: 'Це аніме уже є в списку',
      });
    }
    addListItem({
      id: anime_info?.id,
      module: currentModule,
      is_favorite: !!is_favorite,
      name: own_name || anime_info.name,
      rate: +rate,
      imageUrl: anime_info?.imageUrl,
      status,
      episode,
      season,
      viewed_count: +viewed_count || 0,
    });

    toast({
      title: 'Додано успішно!',
    });
  }

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const commandBoxLabel: Record<Module, string> = {
    [Module.Anime]: 'Аніме',
    [Module.Movie]: 'Фільм',
    [Module.Cartoon]: 'Мультфільм',
  };

  return (
    <>
      <DialogHeader className='mb-2'>
        <DialogTitle>Додавання нового контенту</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <FormCommandBox
            items={contentList}
            placeholder='Виберіть зі списку'
            label={commandBoxLabel[currentModule]}
            name='anime_info'
            handleSearch={handleSearch}
            control={form.control}
          />
          <FormInput
            label='Власна назва'
            placeholder='Введіть власну назву'
            control={form.control}
            name='own_name'
          />
          <FormSelect
            control={form.control}
            name='status'
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
              disabled={form.watch('status') !== Filters.Completed}
              label='Разів переглянуто'
              placeholder='Введіть к-ть'
              control={form.control}
              name='viewed_count'
            />
            <FormInput
              disabled={form.watch('status') !== Filters.Completed}
              label='Рейтинг'
              placeholder='Введіть оцінку'
              control={form.control}
              name='rate'
            />
          </div>
          <div className='flex gap-3'>
            <FormInput
              disabled={
                form.watch('status') === Filters.Completed ||
                form.watch('status') === Filters.InFuture
              }
              label='Серія'
              placeholder='Введіть номер'
              control={form.control}
              name='episode'
            />
            <FormInput
              disabled={
                form.watch('status') === Filters.Completed ||
                form.watch('status') === Filters.InFuture
              }
              label='Сезон'
              placeholder='Введіть сезон'
              control={form.control}
              name='season'
            />
          </div>
          <FormField
            control={form.control}
            name='is_favorite'
            render={({ field }) => (
              <FormItem className='flex w-full flex-row items-center justify-between rounded-md border p-3'>
                <FormLabel
                  className={cn({
                    'text-muted': form.watch('status') !== Filters.Completed,
                  })}
                >
                  Додати до улюблених
                </FormLabel>
                <FormControl>
                  <Switch
                    disabled={form.watch('status') !== Filters.Completed}
                    className='!mt-0 '
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type='submit'>Додати</Button>
        </form>
      </Form>
    </>
  );
};

export default CreateUnity;
