import Image from "next/image";
import type { IListItem } from "@/entities/media/model/convex/constants";
import {
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/shared/ui/command";

interface RecentItemsProps {
  recent: IListItem[];
  onRecentSelect: (mediaId: string) => void;
}

const RecentItems = ({ recent, onRecentSelect }: RecentItemsProps) => (
  <>
    <CommandGroup heading="Останні">
      {recent.map((item) => (
        <CommandItem
          className="flex items-center gap-2 rounded-md p-2 hover:cursor-pointer hover:bg-muted/50"
          key={item._id}
          onSelect={() => onRecentSelect(item.mediaApiId)}
          tabIndex={0}
        >
          {item.image && (
            <Image
              alt={item.name}
              className="h-8 w-8 rounded object-cover"
              height={32}
              src={item.image}
              unoptimized
              width={32}
            />
          )}
          <span className="truncate">{item.name}</span>
        </CommandItem>
      ))}
    </CommandGroup>
    <CommandSeparator />
  </>
);

export { RecentItems };
