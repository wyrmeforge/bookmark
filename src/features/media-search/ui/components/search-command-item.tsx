import dayjs from "dayjs";
import Image from "next/image";
import type { ListMedia } from "@/entities/media";
import { getTranslatedMediaUserStatus } from "@/shared/lib";
import { CommandItem } from "@/shared/ui/command";

type SearchCommandItemProps = {
  item: ListMedia;
  handleClick: () => void;
};

const SearchCommandItem = ({ item, handleClick }: SearchCommandItemProps) => {
  const { imageUrl, name, status, _creationTime } = item;

  return (
    <CommandItem
      className="group flex items-start gap-3 rounded-md p-2 transition-colors hover:cursor-pointer hover:bg-muted/80 focus:bg-muted/10"
      onSelect={handleClick}
      tabIndex={0}
    >
      {imageUrl && (
        <div className="relative h-24 w-16 flex-shrink-0 overflow-hidden rounded-md border">
          <Image
            alt={name}
            className="object-cover"
            fill
            src={imageUrl}
            unoptimized
          />
        </div>
      )}
      <div className="flex h-24 flex-1 flex-col justify-between">
        <div className="flex items-center justify-between gap-2">
          <div className="truncate font-semibold text-base leading-snug">
            {name}
          </div>
          <div className="whitespace-nowrap rounded-full bg-muted px-2 py-0.5 font-medium text-muted-foreground text-xs transition-colors group-hover:bg-black group-hover:text-white">
            {getTranslatedMediaUserStatus(status)}
          </div>
        </div>
        <div className="mt-1 text-md text-muted-foreground">
          {dayjs(_creationTime).format("DD.MM.YYYY")}
        </div>
      </div>
    </CommandItem>
  );
};

export { SearchCommandItem };
