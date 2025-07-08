import { Card, CardContent } from '@/shared/ui/card';
import { WebhookIcon } from 'lucide-react';
import Image from 'next/image';
import { PropsWithChildren } from 'react';

const AuthFormTemplate = ({ children }: PropsWithChildren) => (
  <div className='relative flex min-h-svh flex-row gap-4 overflow-hidden'>
    <div className='absolute left-4 top-4 z-20 flex flex-row items-center gap-1 text-xl font-bold text-primary md:left-10 md:top-10'>
      <WebhookIcon size={36} /> YOOKOSO
    </div>
    <div className='flex w-full items-center justify-center'>
      <Card className='w-full max-w-xl border-none backdrop-blur-sm'>
        <CardContent className='flex h-full min-h-[450px] w-full items-center justify-center p-0'>
          {children}
        </CardContent>
      </Card>
    </div>
    <div className='relative hidden w-1/2 md:block'>
      <Image
        priority
        alt='Банер'
        src='/auth_banner.jpg'
        className='absolute z-10 rounded-lg object-contain brightness-50'
        fill
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 100vw'
      />
    </div>
  </div>
);

export default AuthFormTemplate;
