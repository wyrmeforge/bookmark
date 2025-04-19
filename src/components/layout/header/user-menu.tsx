import React from 'react';

import { LogOut } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { useClerk, useUser } from '@clerk/nextjs';
import { Routes } from '@/enums/routes';

const UserMenu = () => {
  const { user } = useUser();
  const { signOut } = useClerk();

  const { imageUrl, username, fullName, primaryEmailAddress } = user || {};

  const handleLogout = () => {
    signOut({ redirectUrl: Routes.SignIn });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage alt='User Avatar' src={imageUrl} />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='mr-8 w-56'>
        <DropdownMenuLabel className='pb-0'>
          {username || fullName}
        </DropdownMenuLabel>
        <DropdownMenuLabel className='text-xs leading-none text-muted-foreground'>
          {primaryEmailAddress?.emailAddress}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          className='flex gap-2 hover:cursor-pointer'
        >
          <LogOut size={16} />
          <span>Вийти</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
