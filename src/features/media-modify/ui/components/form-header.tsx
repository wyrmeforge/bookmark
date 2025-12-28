import Image from "next/image";
import { DialogDescription, DialogTitle } from "@/shared/ui/dialog";
import { Skeleton } from "@/shared/ui/skeleton";

interface IMediaModifyFormHeaderProps {
  isCreate: boolean;
  bannerImage?: string;
  bannerAlt?: string;
}

export const MediaModifyFormHeader = ({
  isCreate,
  bannerAlt,
  bannerImage,
}: IMediaModifyFormHeaderProps) => (
  <div className="relative h-60 shrink-0 border-b">
    {bannerImage ? (
      <Image
        alt={bannerAlt ?? "Аніме Банер"}
        className="object-cover"
        fill
        src={bannerImage}
      />
    ) : (
      <Skeleton className="absolute inset-0 h-full w-full" />
    )}

    <div className="absolute inset-0 bg-gradient-to-t from-background/100 via-background/40 to-background/20" />

    <div className="absolute bottom-4 left-4">
      <DialogTitle className="font-semibold text-lg">
        {isCreate ? "Додавання нового аніме" : "Редагування аніме"}
      </DialogTitle>
      <DialogDescription className="mt-1 text-muted-foreground text-sm">
        {isCreate
          ? "Заповніть форму, щоб додати аніме до вашого списку."
          : "Оновіть інформацію про обране аніме."}
      </DialogDescription>
    </div>
  </div>
);
