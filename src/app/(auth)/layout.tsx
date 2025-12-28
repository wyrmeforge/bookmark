import { WebhookIcon } from "lucide-react";
import Image from "next/image";
import type { PropsWithChildren } from "react";
import { Card, CardContent } from "@/shared/ui/card";

const AuthFormTemplate = ({ children }: PropsWithChildren) => (
  <div className="relative flex min-h-svh flex-row gap-4 overflow-hidden">
    <div className="absolute top-4 left-4 z-20 hidden flex-row items-center gap-1 font-bold text-primary text-xl md:top-10 md:left-10 md:flex">
      <WebhookIcon size={36} /> YOOKOSO
    </div>
    <div className="flex w-full items-center justify-center">
      <Card className="w-full max-w-xl border-none backdrop-blur-sm">
        <CardContent className="flex h-full min-h-[450px] w-full items-center justify-center p-0">
          {children}
        </CardContent>
      </Card>
    </div>
    <div className="relative hidden w-1/2 md:block">
      <Image
        alt="Банер"
        className="absolute z-10 rounded-lg object-contain brightness-50"
        fill
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw"
        src="/auth_banner.jpg"
      />
    </div>
  </div>
);

export default AuthFormTemplate;
