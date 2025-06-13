import { Card, CardContent } from '@/shared/ui/card';
import { GalleryHorizontalEnd } from 'lucide-react';
import Image from 'next/image';
import { PropsWithChildren } from 'react';

const AuthFormTemplate = ({ children }: PropsWithChildren) => (
  <div className='flex min-h-svh flex-row  items-center justify-center bg-muted p-4 md:p-4'>
    <div className='min-h-[450px] w-full max-w-sm md:max-w-4xl'>
      <Card>
        <CardContent className='flex min-h-[450px] w-full gap-4 p-0'>
          {children}
          {/* <div className='relative hidden w-full rounded-lg bg-muted md:block'>
            <div className='absolute right-10 top-10 z-10 mb-4 flex items-center gap-2 self-center font-medium'>
              <div className='flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground'>
                <GalleryHorizontalEnd className='size-4' />
              </div>
              Bookmark
            </div>
          </div> */}
        </CardContent>
      </Card>
    </div>
    <div className='relative h-full w-full'>
      <Image
        priority
        alt='Auth Anime GIF'
        src='/EX08hXKUwAAKXsC.jpg'
        className='inset-0 h-full w-full rounded-lg object-cover '
        width={2000}
        height={900}
      />
    </div>
  </div>
);

export default AuthFormTemplate;
