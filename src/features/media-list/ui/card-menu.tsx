import { Heart, HeartCrack, MenuIcon } from "lucide-react";
import type { IListItem } from "@/entities/media/model/convex/constants";
import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { DeleteMedia } from "@/widgets/media/delete/delete-media";
import { EditMedia } from "@/widgets/media/edit";
import { useMediaActions } from "../model/use-media-actions";
import { StatusSubMenu } from "./components/status-sub-menu";

interface ICardMenuProps {
  mediaItem: IListItem;
  handleOpen: (isOpen: boolean) => void;
  isHovered: boolean;
}

const CardMenu = ({ mediaItem, isHovered, handleOpen }: ICardMenuProps) => {
  const { name, _id: id, isFavorite, status } = mediaItem;

  const { toggleFavorite } = useMediaActions({ mediaItemId: id, isFavorite });

  const handleToggleFavorite = (e: Event) => {
    e.preventDefault();
    toggleFavorite();
  };

  return (
    <DropdownMenu modal={false} onOpenChange={handleOpen}>
      <DropdownMenuTrigger
        aria-label="Toggle media card menu"
        className="ml-auto h-[36px]"
        onClick={(e) => {
          e.stopPropagation();
        }}
        tabIndex={0}
      >
        <Badge
          className={cn(
            "rounded-none rounded-bl-lg bg-white/20 group-hover:bg-white",
            {
              "bg-white": isHovered,
            }
          )}
          variant="default"
        >
          <MenuIcon className="h-4 w-4 md:h-6 md:w-6" color="black" />
        </Badge>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="mt-2 w-64 rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <DropdownMenuLabel className="truncate">{name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <EditMedia mediaItem={mediaItem} />
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={handleToggleFavorite}
        >
          {isFavorite ? (
            <HeartCrack className="mr-2 h-4 w-4 hover:animate-jump-out" />
          ) : (
            <Heart className="mr-2 h-4 w-4 animate-jump-out" />
          )}
          <span>{isFavorite ? "Видалити з" : "Додати до"} улюблених</span>
        </DropdownMenuItem>
        <StatusSubMenu currentStatus={status} mediaItemId={id} />
        <DeleteMedia id={id} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { CardMenu };
