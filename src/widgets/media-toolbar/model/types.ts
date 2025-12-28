import type { ReactNode } from "react";
import type { TMediaStatus } from "@/entities/media/model/convex/constants";

interface MenuItem {
  key: TMediaStatus;
  title: string;
  icon: ReactNode;
  value: number;
  color: {
    bg: string;
    border: string;
    text: string;
  };
}

export interface UseFiltersReturn {
  menu: MenuItem[];
  currentFilter: TMediaStatus;
  updateFilter: (newFilter: TMediaStatus) => void;
}
