import { Heart } from "lucide-react";
import type { IListItem } from "@/entities/media/model/convex/constants";
import { MEDIA_STATUS_FILTERS } from "@/shared/config/media-filters";
import { useAppState } from "@/shared/lib/app-state-provider";
import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";

export type CardBadgesProps = Pick<
  IListItem,
  "episodesCount" | "isFavorite" | "status"
> & { isHovered: boolean };

const CardBadges = ({
  episodesCount: episodeCount,
  isFavorite,
  status,
  isHovered,
}: CardBadgesProps) => {
  const { currentFilter } = useAppState();

  const isAllFilter = currentFilter === "all";

  const currentMediaStatusConfig = MEDIA_STATUS_FILTERS.find(
    ({ key }) => key === status
  );

  const MediaStatusIcon = currentMediaStatusConfig?.icon;

  const badges = [
    {
      key: "status",
      isVisible: !!MediaStatusIcon && isAllFilter,
      value: MediaStatusIcon ? (
        <MediaStatusIcon className="h-4 w-4 md:h-5 md:w-5" />
      ) : null,
    },
    {
      key: "episodes",
      isVisible: !!episodeCount,
      value: (
        <div className="flex w-12 flex-col items-center text-xs">
          <span>{episodeCount}</span>
          <span>серій</span>
        </div>
      ),
    },
    {
      key: "favorite",
      isVisible: isFavorite,
      value: (
        <Heart className="h-4 w-4 md:h-5 md:w-5" fill="white" stroke="red" />
      ),
    },
  ];

  return (
    <div className="flex items-center justify-center gap-1.5">
      {badges.map(({ isVisible = true, value, key }, index) => {
        if (!isVisible) {
          return null;
        }

        return (
          <Badge
            className={cn(
              "h-full translate-y-[-6px] transform rounded-none rounded-br-lg rounded-bl-lg border border-muted-foreground px-0.5 opacity-0 transition-all duration-300 ease-out hover:cursor-default group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100",
              {
                "translate-y-0 opacity-100": !isAllFilter || isHovered,
              }
            )}
            key={key}
            style={{ transitionDelay: `${index * 75}ms` }}
          >
            {value}
          </Badge>
        );
      })}
    </div>
  );
};

export { CardBadges };
