import { PlusCircleIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/shared/ui/button";

interface EmptyListPlaceholderProps {
  currentFilter: TMediaStatus;
}

import type { TMediaStatus } from "@/entities/media/model/convex/constants";
import { MEDIA_STATUS_FILTERS } from "@/shared/config/media-filters";
import { CreateMedia } from "@/widgets/media/create/create-media";
import placeholder from "../../../../../public/empty-placcecholder.png";

const EmptyListPlaceholder = ({ currentFilter }: EmptyListPlaceholderProps) => {
  const label = MEDIA_STATUS_FILTERS.find(
    (item) => item.key === currentFilter
  )?.label;

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden px-6">
      <Image
        alt="Empty Placeholder"
        className="object-contain opacity-60 drop-shadow-[0_10px_25px_rgba(255,255,255,0.5)]"
        fill
        src={placeholder}
        style={{ maxHeight: "calc(100dvh - 94px)" }}
      />
      <div className="relative z-10 flex flex-col items-center gap-4 rounded-2xl border border-white/20 bg-black/40 px-8 py-6 text-center shadow-lg backdrop-blur-sm">
        <h2 className="bg-gradient-to-r from-white to-orange-400 bg-clip-text font-extrabold text-4xl text-transparent drop-shadow-md">
          Тут поки що порожньо...
        </h2>
        <CreateMedia
          customTrigger={
            <Button aria-label="Додати нове аніме" variant="outline">
              <PlusCircleIcon className="h-6 w-6 animate-pulse" />
              Додати до списку «{label}»
            </Button>
          }
          initialStatus={currentFilter}
        />
      </div>
    </div>
  );
};

export { EmptyListPlaceholder };
