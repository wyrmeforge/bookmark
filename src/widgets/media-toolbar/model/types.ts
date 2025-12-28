import type { ReactNode } from "react";
import type { ListMediaStatus } from "@/entities/media";
import type { MediaStatus } from "@/shared/enums";

type MenuItem = {
  key: ListMediaStatus;
  title: string;
  icon: ReactNode;
  value: number;
  color: {
    bg: string;
    border: string;
    text: string;
  };
};

export interface UseFiltersReturn {
  menu: MenuItem[];
  currentFilter: MediaStatus;
  updateFilter: (newFilter: MediaStatus) => void;
}
