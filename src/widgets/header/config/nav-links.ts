import { Routes } from '@/shared/enums/routes';
import { HomeIcon, UsersRoundIcon } from 'lucide-react';

export const navLinks = [
  {
    labelIcon: HomeIcon,
    ariaLabel: 'Home Page Link',
    href: Routes.Home,
  },
  {
    labelIcon: UsersRoundIcon,
    ariaLabel: 'Friends Page Link',
    href: Routes.Friends,
  },
];
