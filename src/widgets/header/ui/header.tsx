import { UserButton } from "@clerk/nextjs";
import { WebhookIcon } from "lucide-react";
import { Navigation } from "./navigation";

const Header = () => {
  return (
    <header className="z-20 hidden items-center justify-between px-2 py-2 backdrop-blur-md md:flex md:px-20 md:py-4">
      <div className="flex flex-row items-center gap-2">
        <WebhookIcon className="h-6 w-6 md:h-9 md:w-9" />
        <p className="hidden font-bold md:block">YOOKOSO</p>
      </div>
      <Navigation />
      <UserButton />
    </header>
  );
};

export { Header };
