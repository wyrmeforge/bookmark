"use client";

import { useClerk } from "@clerk/nextjs";
import { LogOutIcon } from "lucide-react";
import { Routes } from "@/shared/enums";

const SidebarLeft = () => {
  const { signOut } = useClerk();

  return (
    <>
      <div className="fixed bottom-10 left-5 hidden flex-col gap-4 md:flex">
        <LogOutIcon
          aria-label="Logout"
          className="hover:cursor-pointer"
          onClick={() => signOut({ redirectUrl: Routes.SignIn })}
        />
      </div>
    </>
  );
};

export { SidebarLeft };
