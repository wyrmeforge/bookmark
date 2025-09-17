'use client';

import { UserButton, useUser } from '@clerk/nextjs';
import { Button } from '@/shared/ui/button';
import { useRouter } from 'next/navigation';

const ProfilePage = () => {
  const { user, isSignedIn } = useUser();
  const router = useRouter();

  if (!isSignedIn) {
    return (
      <div className='flex flex-col items-center justify-center p-10'>
        <p className='mb-4 text-lg'>Ви не увійшли в систему.</p>
        <Button onClick={() => router.push('/sign-in')}>Увійти</Button>
      </div>
    );
  }

  return (
    <div className='mx-auto max-w-2xl p-6'>
      <div className='flex flex-col items-center gap-4'>
        <img
          src={user.profileImageUrl}
          alt={user.fullName || 'User Avatar'}
          className='h-24 w-24 rounded-full object-cover'
        />
        <h1 className='text-2xl font-bold'>{user.fullName}</h1>
        <p className='text-sm text-muted-foreground'>
          {user.emailAddresses[0]?.emailAddress}
        </p>

        <div className='mt-4 flex gap-2'>
          <UserButton />
          <Button variant='outline' onClick={() => router.push('/settings')}>
            Налаштування
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
