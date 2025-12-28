import { zodResolver } from "@hookform/resolvers/zod";
import { HeartIcon } from "lucide-react";
import { useMemo } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { MEDIA_STATUS_FILTERS } from "@/shared/config";
import { MediaStatus } from "@/shared/enums";
import { useAppState } from "@/shared/lib";
import { DialogContent } from "@/shared/ui/dialog";
import { Form } from "@/shared/ui/form";
import { FormCheckbox } from "@/shared/ui/form-checkbox";
import { FormInput } from "@/shared/ui/form-input";

import { FormSelect } from "@/shared/ui/form-select";
import { FormTextarea } from "@/shared/ui/form-textarea";
import {
  formDefaultValues,
  ModifyFormSchema,
  type TMediaModifyFormValues,
} from "../model/helpers";
import { useAutoFillCounts } from "../model/hooks/use-autofill-counts";
import { useMediaModifyFormLifecycle } from "../model/hooks/use-media-modify-form";
import { FormFooter } from "./components/form-footer";
import { MediaModifyFormHeader } from "./components/form-header";
import { FormSearch } from "./components/form-search";
import { FormStatsSection } from "./components/form-stats-section";

interface IMediaModifyFormProps {
  onSubmit: SubmitHandler<TMediaModifyFormValues>;
  variant: "create" | "edit";
  initialValues?: Partial<TMediaModifyFormValues>;
}

export const MediaModifyForm = ({
  onSubmit,
  variant,
  initialValues,
}: IMediaModifyFormProps) => {
  const { isCreateSheetOpen } = useAppState();

  const form = useForm<TMediaModifyFormValues>({
    resolver: zodResolver(ModifyFormSchema),
    defaultValues: { ...formDefaultValues, ...initialValues },
    mode: "onChange",
  });

  const {
    formState: { isSubmitSuccessful },
    watch,
    handleSubmit,
    reset,
    setValue,
  } = form;

  const [currentStatus, isFavorite, selectedAnime] = watch([
    "status",
    "isFavorite",
    "unity_info",
  ]);

  const mediaStatusFilter = useMemo(
    () =>
      MEDIA_STATUS_FILTERS.filter(
        ({ key }) => key !== "all" && key !== "favorite"
      ).map(({ key, label, icon, color }) => ({
        value: key,
        icon,
        label,
        color,
      })),
    []
  );

  const isCreateForm = useMemo(() => variant === "create", [variant]);

  const isCompleted = useMemo(
    () => currentStatus === MediaStatus.Completed,
    [currentStatus]
  );

  useAutoFillCounts({ setValue, isCompleted, selectedAnime });

  useMediaModifyFormLifecycle({
    isSubmitSuccessful,
    isDialogOpen: isCreateSheetOpen,
    reset,
  });

  return (
    <DialogContent className="top-1/2 left-1/2 max-h-[90vh] w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-hidden p-0">
      <MediaModifyFormHeader
        bannerAlt={selectedAnime?.name}
        bannerImage={selectedAnime?.bannerImage}
        isCreate={isCreateForm}
      />
      <Form {...form}>
        <form
          className="flex h-full min-h-0 w-full flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="min-h-0 flex-1 space-y-6 overflow-y-auto p-4">
            {isCreateForm && <FormSearch />}
            <FormSelect
              items={mediaStatusFilter}
              label="Статус"
              name="status"
            />
            <div className="space-y-3 rounded-lg bg-muted/30 p-4 transition-all hover:bg-muted">
              <FormInput
                label="Власна назва"
                name="name"
                placeholder="Введіть назву українською"
              />
              <FormInput
                label="Де дивлюсь?"
                name="website"
                placeholder="Введіть посилання на сайт"
              />
            </div>
            <FormStatsSection animeEpisodes={selectedAnime.episodes} />
            <div className="space-y-3 rounded-lg bg-muted/30 p-4 transition-all hover:bg-muted">
              <FormCheckbox
                checkedIcon={<HeartIcon fill="red" />}
                label={
                  isFavorite ? "Видалити з улюблених" : "Додати до улюблених"
                }
                name="isFavorite"
                noThumbAnimation
                uncheckedIcon={<HeartIcon />}
              />
              <FormTextarea name="comment" placeholder="Нотатка" />
            </div>
          </div>
          <FormFooter isCreateForm={isCreateForm} />
        </form>
      </Form>
    </DialogContent>
  );
};
