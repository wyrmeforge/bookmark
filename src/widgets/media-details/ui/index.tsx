'use client';

import { Button } from '@/shared/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/shared/ui/dialog';
import { Loader } from '@/shared/ui/loader';
import { ArrowLeftIcon, ChevronsDownIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useMutation, useQuery } from 'convex/react';
import { api } from '@convex/api';
import { useMediaDetails } from '@/shared/lib';
import { useUser } from '@clerk/nextjs';
import { useState } from 'react';
import { MediaPoster } from '@/entities/media';
import {
  Comments,
  MediaInfo,
  MediaRateStats,
  MediaStatusStats,
  MediaTrailer,
  UserActivity,
} from '@/features/media-details';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { ScrollArea } from '@/shared/ui/scroll-area';
import { Card, CardContent } from '@/shared/ui/card';
import { Scrollbar } from '@radix-ui/react-scroll-area';

export const MediaDetails = ({ id }) => {
  const router = useRouter();
  const data = useQuery(api.lists.getListItem, { mediaId: +id });

  const mediaStats = useQuery(api.media.getMediaStats, { mediaId: +id });

  const { isMediaItemLoading, mediaDetails } = useMediaDetails(id);

  console.log(data);

  const handleGoBack = () => {
    router.back();
  };

  if (isMediaItemLoading) return <Loader />;

  return (
    <div className='w-full px-4 py-6 sm:px-6 md:px-12'>
      {mediaDetails?.bannerImage && (
        <Image
          className='hidden h-[200px] blur-sm brightness-50 grayscale-0 md:block md:h-[400px]'
          src={mediaDetails?.bannerImage}
          alt='a'
          width={1920}
          height={1080}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            width: '100vw',
            zIndex: '-20',
          }}
        />
      )}

      {/* Top Nav */}
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <Button
          onClick={handleGoBack}
          className='flex h-10 w-fit items-center gap-2 rounded-full border px-4 text-sm transition hover:border-black hover:bg-muted'
          variant='ghost'
        >
          <ArrowLeftIcon size={20} />
          Назад
        </Button>

        <Button size='sm' variant='destructive'>
          Видалити з мого списку
        </Button>
      </div>

      {/* Background overlay */}
      {mediaDetails?.coverImage?.color && (
        <div className='absolute inset-0 -z-10 overflow-hidden'>
          <div
            className='absolute inset-0 opacity-40 backdrop-blur-3xl'
            style={{
              background: `linear-gradient(120deg, ${mediaDetails.coverImage.color}60, background 55%)`,
            }}
          />
        </div>
      )}

      <MediaInfo
        name={data?.name}
        startDate={mediaDetails?.startDate}
        duration={mediaDetails?.duration}
        status={mediaDetails?.status}
        episodes={mediaDetails?.episodes}
        format={mediaDetails?.format}
        genres={mediaDetails?.genres}
        studios={mediaDetails?.studios}
        title={mediaDetails?.title}
        website={data?.website}
      />
      <div className='mt-6 flex flex-col gap-6 lg:flex-row lg:gap-10'>
        {/* Left: Poster */}
        <div className='flex w-full max-w-[390px] flex-col gap-4'>
          <div className='relative mx-auto h-[650px] w-full max-w-[390px] overflow-hidden rounded-xl shadow-md'>
            <MediaPoster
              src={mediaDetails?.coverImage?.extraLarge}
              alt={data?.name || 'Media Poster'}
              priority
            />
          </div>
        </div>
        <Tabs defaultValue='account' className='w-full'>
          <TabsList>
            <TabsTrigger value='asd'>Загальна інформація</TabsTrigger>
            <TabsTrigger value='account'>Коментарі</TabsTrigger>
            <TabsTrigger value='password'>Трейлер</TabsTrigger>
            <TabsTrigger value='asdasd'>Персонажі</TabsTrigger>
          </TabsList>
          <TabsContent value='account'>
            <Comments id={id} />
          </TabsContent>
          <TabsContent value='password'>
            <MediaTrailer trailer={mediaDetails?.trailer} />
          </TabsContent>
          <TabsContent value='asd'>
            <div className='space-y-4'>
              <h3 className='text-lg font-semibold text-foreground'>
                Пов'язані тайтли
              </h3>

              <ScrollArea className='w-full whitespace-nowrap rounded-md border'>
                <div className='flex space-x-4 p-4'>
                  {mediaDetails?.relations?.edges.map(
                    ({ node, relationType }) => (
                      <Card
                        onClick={() => router.push(`/home/${node.id}`)}
                        key={node.id}
                        className='w-[140px] shrink-0 border-border'
                      >
                        <CardContent className='p-2'>
                          <Image
                            src={node.coverImage.large}
                            alt={node.title.romaji}
                            width={128}
                            height={180}
                            className='rounded-md object-cover'
                          />
                          <div className='mt-2 line-clamp-2 text-xs font-medium text-foreground'>
                            {node.title.english || node.title.romaji}
                          </div>
                          <div className='text-[10px] text-muted-foreground'>
                            {node.status}
                          </div>
                          <div className='text-[10px] italic text-muted-foreground'>
                            {relationType}
                          </div>
                        </CardContent>
                      </Card>
                    )
                  )}
                </div>
                <Scrollbar orientation='horizontal' />
              </ScrollArea>
            </div>
          </TabsContent>
        </Tabs>

        {/* Right: Activity */}
        <div className='flex w-full max-w-full flex-col gap-4 lg:max-w-[300px]'>
          <UserActivity
            rate={data?.rate}
            episode={data?.episode}
            status={data?.status}
            viewedCount={data?.viewedCount}
            comment={data?.comment}
            episodes={mediaDetails.episodes}
          />
          {/* Friends' Activity */}
          <div className='rounded-xl border bg-card p-4 shadow-sm'>
            <h4 className='mb-3 text-sm font-semibold text-muted-foreground'>
              Активність друзів
            </h4>
            <div className='flex flex-col gap-3 text-sm text-muted-foreground'>
              <div className='flex justify-between'>
                <span className='text-foreground'>@andrii_k</span>
                <span>Дивиться · 9.0</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-foreground'>@solomia_777</span>
                <span>Переглянуто · 7.5</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-foreground'>@taras.dev</span>
                <span>В планах</span>
              </div>
              <div className='flex w-full items-center justify-center'>
                <ChevronsDownIcon />
              </div>
            </div>
          </div>

          {mediaStats && (
            <div className='flex flex-col gap-6'>
              <MediaStatusStats
                users={mediaStats?.users}
                totalStatuses={mediaStats.totalStatuses}
              />
              <MediaRateStats
                totalRate={mediaStats.totalRate}
                users={mediaStats.users}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
