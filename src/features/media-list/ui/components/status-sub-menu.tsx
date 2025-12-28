import { FilterIcon } from "lucide-react";
import { useMemo } from "react";
import type {
  TMediaId,
  TMediaStatus,
} from "@/entities/media/model/convex/constants";
import { MEDIA_STATUS_FILTERS } from "@/shared/config/media-filters";
import { cn } from "@/shared/lib/utils";
import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/shared/ui/dropdown-menu";
import { useMediaActions } from "../../model/use-media-actions";

interface IStatusSubMenuProps {
  mediaItemId: TMediaId;
  currentStatus: TMediaStatus;
}

const StatusSubMenu = ({ mediaItemId, currentStatus }: IStatusSubMenuProps) => {
  const { changeStatus } = useMediaActions({ mediaItemId });

  const mediaStatusFilter = useMemo(
    () =>
      MEDIA_STATUS_FILTERS.filter(
        ({ key }) => key !== "all" && key !== "favorite"
      ),
    []
  );

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <FilterIcon className="mr-2 h-4 w-4" />
        Змінити статус на
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent className="px-2">
          {mediaStatusFilter.map(({ label, key, icon: Icon }) => (
            <DropdownMenuItem
              className={cn("flex gap-3 hover:cursor-pointer", {
                "bg-gray-700": key === currentStatus,
              })}
              key={key}
              onClick={() => changeStatus(key)}
            >
              <Icon size={16} />
              <span>{label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
};

export { StatusSubMenu };
