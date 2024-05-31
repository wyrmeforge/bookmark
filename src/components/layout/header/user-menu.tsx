import React from 'react';

import { LogOut, Settings, User } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { SignOutButton, useUser } from '@clerk/nextjs';

const UserMenu = () => {
  const { user } = useUser();

  const { imageUrl, username, fullName, primaryEmailAddress } = user || {};

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={imageUrl} />
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
        <DropdownMenuGroup>
          <DropdownMenuItem className='flex gap-2 hover:cursor-pointer'>
            <User size={16} />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className='flex gap-2 hover:cursor-pointer'>
            <Settings size={16} />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='flex gap-2 hover:cursor-pointer'>
          <LogOut size={16} />
          <SignOutButton redirectUrl='/sign-in' />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
