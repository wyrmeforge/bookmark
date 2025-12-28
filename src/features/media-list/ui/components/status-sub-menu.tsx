import { FilterIcon } from "lucide-react";
import type { MediaItemId, MediaItemStatus } from "@/shared/api";
import { cn } from "@/shared/lib/utils";
import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/shared/ui/dropdown-menu";
import { MENU_MEDIA_FILTERS } from "../../config";
import { useMediaActions } from "../../model/use-media-actions";

interface IStatusSubMenuProps {
  mediaItemId: MediaItemId;
  currentStatus: MediaItemStatus;
}

const StatusSubMenu = ({ mediaItemId, currentStatus }: IStatusSubMenuProps) => {
  const { changeStatus } = useMediaActions({ mediaItemId });

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <FilterIcon className="mr-2 h-4 w-4" />
        Змінити статус на
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent className="px-2">
          {MENU_MEDIA_FILTERS.map(({ label, key, icon: Icon }) => (
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
