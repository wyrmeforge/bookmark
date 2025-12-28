"use client";

import { SquarePlusIcon } from "lucide-react";
import type { ReactNode } from "react";
import type { TMediaStatus } from "@/entities/media/model/convex/constants";
import type { TMediaModifyFormValues } from "@/features/media-modify/model/helpers";
import { MediaModifyForm } from "@/features/media-modify/ui/media-modify-form";
import { useAppState } from "@/shared/lib/app-state-provider";
import { Button } from "@/shared/ui/button";
import { Dialog, DialogTrigger } from "@/shared/ui/dialog";
import { useCreateMedia } from "./model/use-create-media";

interface ICreateMediaProps {
  initialStatus?: TMediaStatus;
  customTrigger?: ReactNode;
}

const CreateMedia = ({ customTrigger }: ICreateMediaProps) => {
  const { isCreateSheetOpen, toggleCreateSheet } = useAppState();
  const { createNewMedia } = useCreateMedia();

  const onSubmit = (data: TMediaModifyFormValues) => {
    createNewMedia(data);
  };

  const initialValues: Partial<TMediaModifyFormValues> = {
    status: "scheduled",
  };

  const trigger = customTrigger || (
    <Button
      aria-label="Додати нове аніме"
      className="m-0 size-8 bg-transparent p-0 [&_svg]:size-8"
      size="icon"
    >
      <SquarePlusIcon color="white" />
    </Button>
  );

  return (
    <Dialog onOpenChange={toggleCreateSheet} open={isCreateSheetOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <MediaModifyForm
        initialValues={initialValues}
        onSubmit={onSubmit}
        variant="create"
      />
    </Dialog>
  );
};

export { CreateMedia };
