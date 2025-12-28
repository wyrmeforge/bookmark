"use client";

import { useState } from "react";
import type { TMediaStatus } from "@/entities/media/model/convex/constants";
import { StorageKeys } from "@/shared/enums/storage";
import { useMobile } from "@/shared/lib/hooks/use-mobile";
import { cn } from "@/shared/lib/utils";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/shared/ui/carousel";
import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/toggle-group";
import { useFilters } from "../model/use-filters";

const FiltersToggleGroup = () => {
  const { menu, currentFilter, updateFilter } = useFilters();
  const { isMobile } = useMobile();

  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);

  const onSelect = (idx: number) => {
    if (!carouselApi) {
      return null;
    }

    carouselApi?.scrollTo(idx);
  };

  const handleChange = (value: TMediaStatus) => {
    if (!value) {
      return;
    }

    updateFilter(value);
    localStorage.setItem(StorageKeys.LastStatusFilter, value);
  };

  if (!isMobile) {
    return (
      <ToggleGroup
        className="z-0 w-full justify-start gap-0 border-b border-b-gray-500"
        onValueChange={handleChange}
        type="single"
        value={currentFilter}
      >
        {menu.map(({ title, value, key, icon }) => (
          <ToggleGroupItem
            aria-label={key}
            className={cn(
              "relative inline-flex w-full items-center justify-center whitespace-nowrap rounded-none px-4 py-2 text-muted-foreground data-[state=on]:bg-transparent",
              {
                "z-10 before:absolute before:-bottom-[1px] before:left-0 before:w-full before:border-b before:border-b-white":
                  currentFilter === key,
              }
            )}
            key={key}
            value={key}
          >
            {icon}
            <span className="ml-2">{title}</span>
            <div
              className={cn("ml-2 text-muted-foreground", {
                "text-white": currentFilter === key,
              })}
            >
              {value}
            </div>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    );
  }

  return (
    <div className="fixed inset-0 z-40 h-16 bg-background p-1 shadow-2xl">
      <Carousel
        className="relative w-full p-2"
        opts={{
          align: "end",
          loop: false,
          dragFree: true,
        }}
        setApi={setCarouselApi}
      >
        <ToggleGroup
          className="z-0 w-full justify-start gap-0"
          onValueChange={handleChange}
          type="single"
          value={currentFilter}
        >
          <CarouselContent className="flex-nowrap">
            {menu.map(({ title, key }, idx) => (
              <CarouselItem
                className="basis-auto pl-2"
                key={key}
                onClick={() => onSelect(idx)}
              >
                <ToggleGroupItem
                  aria-label={key}
                  className={cn(
                    "relative inline-flex cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-none px-0 py-2 text-muted-foreground data-[state=on]:bg-transparent md:px-4",
                    {
                      "z-10 before:absolute before:bottom-0 before:left-0 before:w-1/2 before:translate-x-1/2 before:border-b-2 before:border-b-white":
                        currentFilter === key,
                    }
                  )}
                  value={key}
                >
                  {title}
                </ToggleGroupItem>
              </CarouselItem>
            ))}
          </CarouselContent>
        </ToggleGroup>
      </Carousel>
    </div>
  );
};

export { FiltersToggleGroup };
