import Image from "next/image";
import type { ListMedia } from "@/entities/media";
import {
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/shared/ui/command";

type RecentItemsProps = {
  recent: ListMedia[];
  onRecentSelect: (mediaId: number) => void;
};

const RecentItems = ({ recent, onRecentSelect }: RecentItemsProps) => (
  <>
    <CommandGroup heading="Останні">
      {recent.map((item) => (
        <CommandItem
          className="flex items-center gap-2 rounded-md p-2 hover:cursor-pointer hover:bg-muted/50"
          key={item._id}
          onSelect={() => onRecentSelect(item.mediaId)}
          tabIndex={0}
        >
          {item.imageUrl && (
            <Image
              alt={item.name}
              className="h-8 w-8 rounded object-cover"
              height={32}
              src={item.imageUrl}
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
