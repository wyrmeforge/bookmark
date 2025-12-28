import type { Metadata } from "next";
import { MediaList } from "@/features/media-list/ui/media-list";
import { MediaToolbar } from "@/widgets/media-toolbar/ui/media-toolbar";
import { SidebarLeft } from "./components/sidebar-left";
import { SidebarRight } from "./components/sidebar-right";

export const metadata: Metadata = {
  title: "Головна | YOOKOSO",
  description: "Головна сторінка | YOOKOSO",
};

const HomePage = async () => {
  return (
    <div className="flex h-full flex-row">
      <SidebarLeft />
      <div className="mx-auto flex h-full w-full flex-col">
        <MediaToolbar />
        <MediaList />
      </div>
      <SidebarRight />
    </div>
  );
};

export default HomePage;
