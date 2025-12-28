import { SettingsIcon } from "lucide-react";

const SidebarRight = () => {
  return (
    <div className="fixed top-5 right-5 z-20 hidden flex-col gap-4 rounded-lg bg-black p-1 md:right-10 md:bottom-10 md:flex md:bg-transparent md:p-0">
      <div className="mt-auto">
        <SettingsIcon />
      </div>
    </div>
  );
};

export { SidebarRight };
