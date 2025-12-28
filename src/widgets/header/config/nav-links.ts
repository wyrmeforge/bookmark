import { HomeIcon, Users2Icon } from "lucide-react";
import { Routes } from "@/shared/enums/routes";

export const navLinks = [
  {
    labelIcon: HomeIcon,
    ariaLabel: "Home Page Link",
    href: Routes.Home,
  },
  {
    labelIcon: Users2Icon,
    ariaLabel: "Friends Page Link",
    href: Routes.Friends,
  },
];
