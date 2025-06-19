import { WebhookIcon } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';
import { Navigation } from './navigation';

const Header = () => {
  return (
    <header className='z-20 flex items-center justify-between px-20 py-4'>
      <div className='flex flex-row items-center gap-2'>
        <WebhookIcon size={36} /> <p className='font-bold'>YOKOSO</p>
      </div>
      <Navigation />
      <UserButton></UserButton>
    </header>
  );
};

export { Header };
