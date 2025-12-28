import { PlusCircleIcon } from "lucide-react";
import Image from "next/image";
import type { TMediaStatusValues } from "@/entities/media/model/convex/constants";
import { Button } from "@/shared/ui/button";
import { CreateMedia } from "@/widgets/media/create/create-media";
import empty_list_image from "../../../../../public/empty_list.png";

interface IEmptyMediaListProps {
  currentFilter: TMediaStatusValues;
}

const EmptyMediaList = ({ currentFilter }: IEmptyMediaListProps) => (
  <div className="relative flex h-full w-full flex-col items-center justify-center">
    <Image
      alt="Список порожній"
      className="absolute bottom-0 -left-[16px] w-auto brightness-50 md:left-0"
      loading="lazy"
      src={empty_list_image}
    />
    <div className="z-10 mb-6 flex flex-col items-center gap-2">
      <h2 className="animate-fade-in font-semibold text-2xl text-muted-foreground">
        Здається тут порожньо...
      </h2>
    </div>
    <div className="flex flex-row items-center gap-2">
      <CreateMedia
        customTrigger={
          <Button aria-label="Додати нове аніме">
            <PlusCircleIcon /> Додати
          </Button>
        }
        initialStatus={currentFilter}
      />
    </div>
  </div>
);

export { EmptyMediaList };
