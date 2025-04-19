import { Card, CardContent } from '@/components/ui/card';
import { GalleryHorizontalEnd } from 'lucide-react';
import Image from 'next/image';
import React, { PropsWithChildren } from 'react';

const AuthFormTemplate = ({ children }: PropsWithChildren) => (
  <div className='flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10'>
    <div className='min-h-[450px] w-full max-w-sm md:max-w-4xl'>
      <Card>
        <CardContent className='flex min-h-[450px] w-full gap-4 p-0'>
          {children}
          <div className='relative hidden w-full rounded-lg bg-muted md:block'>
            <div className='absolute right-10 top-10 z-10 mb-4 flex items-center gap-2 self-center font-medium'>
              <div className='flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground'>
                <GalleryHorizontalEnd className='size-4' />
              </div>
              Bookmark
            </div>
            <Image
              priority
              alt='Auth Anime GIF'
              src='https://i.pinimg.com/originals/15/3c/06/153c06e2d14807079954a5d3b7cdb06c.gif'
              className='absolute inset-0 h-full w-full rounded-lg rounded-bl-none rounded-tl-none object-cover brightness-[0.3] grayscale'
              width={300}
              height={300}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default AuthFormTemplate;
