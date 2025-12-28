import { useState } from "react";
import { type ListMedia, MediaMeta, MediaPoster } from "@/entities/media";
import { formatDate } from "@/shared/lib";
import { cn } from "@/shared/lib/utils";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { CardBadges } from "./card-badges";
import { CardMenu } from "./card-menu";

type MediaCardProps = {
  mediaData: ListMedia;
  itemIdx: number;
};

const MediaCard = ({ mediaData, itemIdx }: MediaCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const {
    image,
    name,
    _creationTime,
    isFavorite,
    rate,
    episodesCount,
    status,
  } = mediaData;

  const formattedDate = formatDate(_creationTime);

  return (
    <Card
      className={cn(
        "group relative z-10 h-full min-h-[300px] w-full rounded-none border shadow transition-all md:min-h-[600px] dark:border-neutral-800",
        {
          "dark:border-white": isHovered,
        }
      )}
    >
      <CardHeader className="absolute -top-[2px] z-10 w-full p-0">
        <div className="flex w-full flex-row justify-between pl-2">
          <CardBadges
            episode={episodesCount}
            isFavorite={isFavorite}
            isHovered={isHovered}
            status={status}
            totalEpisodes={0}
          />
          <CardMenu
            handleOpen={(isOpen: boolean) => setIsHovered(isOpen)}
            isHovered={isHovered}
            mediaItem={mediaData}
          />
        </div>
      </CardHeader>
      <CardContent className="relative h-full p-0">
        <MediaPoster alt={name} priority={itemIdx < 3} src={image} />
        <MediaMeta
          createdDate={formattedDate}
          episode={episodesCount}
          rate={rate}
          title={name}
          totalEpisodes={0}
        />
      </CardContent>
    </Card>
  );
};

export { MediaCard };
