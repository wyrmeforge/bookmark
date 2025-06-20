import { WebhookIcon } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';
// import { Navigation } from './navigation';

const Header = () => {
  return (
    <header className='z-20 flex items-center justify-between px-2 py-2 md:px-20 md:py-4'>
      <div className='flex flex-row items-center gap-2'>
        <WebhookIcon className='h-6 w-6 md:h-9 md:w-9' />
        <p className='hidden font-bold md:block'>YOOKOSO</p>
      </div>
      {/* <Navigation /> */}
      <UserButton></UserButton>
    </header>
  );
};

export { Header };
