"use client";

import clsx from "clsx";
import { Home, PlusIcon, WebhookIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { MediaSearch } from "@/features/media-search";
import { Routes } from "@/shared/enums";
import { Button } from "@/shared/ui/button";
import { CreateMedia } from "@/widgets/media/create/create-media";

const navItems = [
  { id: "/home", icon: Home, label: "Головна", href: Routes.Home },
];

export default function MinimalNav() {
  const router = useRouter();
  const [active, setActive] = useState("home");
  const pathname = usePathname();

  const handleItemClick = ({ href, id }: { href: Routes; id: string }) => {
    if (active === id) return;

    setActive(id);
    router.push(href);
  };

  return (
    <div className="fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1 md:relative md:top-4 md:bottom-[unset] md:w-full md:justify-between md:gap-4 md:px-20 md:pb-4">
      <div className="w-[310px]">
        <div className="flex h-14 w-fit items-center gap-4 rounded-full border border-white/10 bg-black/70 p-2 px-4 shadow-xl backdrop-blur-md md:flex">
          <div className="flex flex-row items-center gap-2">
            <WebhookIcon className="h-6 w-6" />
            <p className="hidden font-bold text-sm md:block">YOOKOSO</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex items-center gap-1 rounded-full border border-white/10 bg-black/70 p-2 shadow-xl backdrop-blur-md md:gap-4">
          {navItems.map(({ id, href, icon: Icon, label }) => (
            <Button
              className={clsx(
                "relative flex items-center gap-2 rounded-full px-4 py-2 transition-all duration-200",
                pathname === id
                  ? "scale-105 bg-white text-black shadow-md"
                  : "text-gray-400 hover:text-white"
              )}
              key={id}
              onClick={() => handleItemClick({ href, id })}
              variant="ghost"
            >
              <Icon size={18} />
              {pathname === id && (
                <span className="hidden text-sm md:block">{label}</span>
              )}
            </Button>
          ))}
        </div>
      </div>
      <div className="flex flex-row items-center gap-2 rounded-full border border-white/10 bg-black/70 p-2 shadow-xl backdrop-blur-md">
        <MediaSearch />
        <CreateMedia
          customTrigger={
            <Button className="relative flex items-center gap-2 rounded-full px-4 py-2 transition-all duration-200">
              <PlusIcon size={20} />

              <span className="hidden text-sm md:block">Додати</span>
              <kbd className="ml-auto hidden rounded border px-1 text-xs sm:inline-block">
                Ctrl+D
              </kbd>
            </Button>
          }
        />
      </div>
    </div>
  );
}
