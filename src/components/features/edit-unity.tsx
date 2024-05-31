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
import { useMutation, useQuery } from 'convex/react';
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
import { Id } from '../../../convex/_generated/dataModel';
import Loader from '../loader';

enum FormFields {
  ImageUrl = 'image_url',
  Name = 'name',
  ViewedCount = 'viewed_count',
  Rate = 'rate',
  Status = 'status',
  IsFavorite = 'is_favorite',
}

const FormSchema = u.object({
  name: u.string().optional(),
  viewed_count: u.string().optional(),
  rate: u.string().optional(),
  status: u.string().optional(),
  is_favorite: u.boolean().optional(),
  episode: u.string().optional(),
  season: u.string().optional(),
});

const EditUnity = ({ listItem, unityId }) => {
  const { name, status, season, rate, is_favorite, episode, viewed_count } =
    listItem || {};

  const updateListItem = useMutation(api.lists.updateList);

  const defaultValues: u.infer<typeof FormSchema> = {
    [FormFields.Name]: name,
    [FormFields.ViewedCount]: viewed_count?.toString(),
    [FormFields.Rate]: rate?.toString(),
    [FormFields.Status]: status,
    [FormFields.IsFavorite]: is_favorite,
    episode,
    season,
  };

  const form = useForm<u.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  console.log(form.formState.errors);

  function onSubmit(data: u.infer<typeof FormSchema>) {
    console.log(data);
    updateListItem({
      id: unityId,
      newData: {
        ...data,
        rate: +data.rate,
        viewed_count: +data.viewed_count,
      },
    });
  }

  return (
    <>
      <DialogHeader className='mb-2'>
        <DialogTitle>Редагування</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <FormInput
            label='Назва'
            placeholder='Введіть назву'
            control={form.control}
            name='name'
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
          <Button type='submit'>Змінити</Button>
        </form>
      </Form>
    </>
  );
};

export default EditUnity;
