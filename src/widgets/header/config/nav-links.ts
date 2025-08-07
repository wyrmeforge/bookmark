import { Routes } from '@/shared/enums';
import { BookCopyIcon, HomeIcon, Users2Icon } from 'lucide-react';

export const navLinks = [
  {
    labelIcon: HomeIcon,
    ariaLabel: 'Home Page Link',
    href: Routes.Home,
  },
  {
    labelIcon: Users2Icon,
    ariaLabel: 'Friends Page Link',
    href: Routes.Friends,
  },
  {
    labelIcon: BookCopyIcon,
    ariaLabel: 'Friends Page Link',
    href: Routes.Friends,
  },
];
